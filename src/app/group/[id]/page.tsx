import { getGroupDetail, joinGroup } from '@/features/group/api/voteRoomApi'
import VoteRoomContainer from '@/features/group/components/vote-room/VoteRoomContainer'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import type { Metadata } from 'next'
import AsyncBoundary from '@/shared/components/boundary/AsyncBoundary'

export const metadata: Metadata = {
	description: '그룹방에 참여해보세요',
}

interface Props {
	params: Promise<{ id: string }>
}

export default async function GroupDetailPage({ params }: Props) {
	const { id } = await params

	await joinGroup(id)

	const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['group', id],
		queryFn: () => getGroupDetail(id),
	})

	const dehydratedState = dehydrate(queryClient)

	return (
		<HydrationBoundary state={dehydratedState}>
			<AsyncBoundary>
				<VoteRoomContainer roomId={id} />
			</AsyncBoundary>
		</HydrationBoundary>
	)
}
