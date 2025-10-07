import { getGroupDetail } from '@/features/group/api/voteRoomApi'
import VoteRoomContainer from '@/features/group/components/vote-room/VoteRoomContainer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	description: '그룹방에 참여해보세요',
}

interface Props {
	params: Promise<{ id: string }>
}

export default async function GroupDetailPage({ params }: Props) {
	const { id } = await params
	const detail = await getGroupDetail(id)

	return <VoteRoomContainer room={detail!} />
}
