// import { getGroupDetail } from '@/features/group/api/voteRoomApi'
import VoteRoomContainer from '@/features/group/components/vote-room/VoteRoomContainer'
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
		dislikeMenuList: [
			{
				id: '1',
				name: '떡볶이',
				createdBy: '1',
			},
			{
				id: '2',
				name: '치킨',
				createdBy: '2',
			},

			{
				id: '3',
				name: '피자',
				createdBy: '3',
			},
		],
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

	return <VoteRoomContainer room={detail!} />
}
