import {
	getGroupDetail,
	getGroupMenuSelectMethod,
	getGroupRouletteDetail,
	joinGroup,
} from '@/features/group/api/voteRoomApi'
import VoteRoomContainer from '@/features/group/components/vote-room/VoteRoomContainer'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import type { Metadata } from 'next'
import AsyncBoundary from '@/shared/components/boundary/AsyncBoundary'
import { VotingType } from '@/features/group/types/group'

export const metadata: Metadata = {
	description: '그룹방에 참여해보세요',
}

interface Props {
	params: Promise<{ id: string }>
}

export default async function GroupDetailPage({ params }: Props) {
	const { id } = await params

	await joinGroup(id)

	const { menuSelectMethod } = await getGroupMenuSelectMethod(id)

	const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['group', menuSelectMethod, id],
		queryFn: () =>
			menuSelectMethod === 'ROULETTE' ? getGroupRouletteDetail(id) : getGroupDetail(id),
	})

	const dehydratedState = dehydrate(queryClient)

	return (
		<HydrationBoundary state={dehydratedState}>
			<AsyncBoundary>
				<VoteRoomContainer roomId={id} menuSelectMethod={menuSelectMethod as VotingType} />
			</AsyncBoundary>
		</HydrationBoundary>
	)
}
