// import { getGroupDetail } from '@/features/group/api/voteRoomApi'
import VoteRoom from '@/features/group/components/vote-room/VoteRoom'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	description: '그룹방에 참여해보세요',
}

// interface Props {
// 	params: Promise<{ id: string }>
// }

export default async function GroupDetailPage(/*{ params }: Props*/) {
	// const { id } = await params
	// const detail = await getGroupDetail(id)

	const detail = {
		roomId: '9b30f61e-c4f2-4480-aa23-eeda2e100075',
		title: '회사 동료들',
		voteStatus: 'ONGOING',
		menuList: [],
		participantList: [
			{
				id: '1',
				name: '밥버디',
				imageUrl: '',
			},
			{
				id: '2',
				name: '윤소연',
				imageUrl: '',
			},
			{
				id: '3',
				name: '윤소연',
				imageUrl: '',
			},
			{
				id: '4',
				name: '윤소연',
				imageUrl: '',
			},
			{
				id: '5',
				name: '윤소연',
				imageUrl: '',
			},
			{
				id: '6',
				name: '윤소연',
				imageUrl: '',
			},
		],
		totalParticipants: 6,
		votedParticipants: 0,
	}

	return <VoteRoom room={detail!} />
}
