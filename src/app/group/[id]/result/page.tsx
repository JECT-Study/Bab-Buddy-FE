// import { getVoteResult } from '@/features/group/api/voteApi'
import VoteResult from '@/features/group/components/vote-result/VoteResult'

interface ResultPageProps {
	params: Promise<{
		id: string
	}>
}

export default async function ResultPage({ params }: ResultPageProps) {
	const { id } = await params
	console.log('id', id)
	// const result = await getVoteResult(id)
	const result = {
		voteRoomId: '9b30f61e-c4f2-4480-aa23-eeda2e100075',
		title: '1차 테스트',
		result: {
			topMenus: [
				{
					rank: 1,
					count: 6,
					menus: [
						{
							menuName: '샌드위치',
							voteCount: 3,
						},
						// {
						// 	menuName: '햄버거',
						// 	voteCount: 3,
						// },
					],
				},
				// {
				// 	rank: 2,
				// 	count: 5,
				// 	menus: [
				// 		{
				// 			menuName: '피자',
				// 			voteCount: 5,
				// 		},
				// 	],
				// },
				// {
				// 	rank: 3,
				// 	count: 2,
				// 	menus: [
				// 		{
				// 			menuName: '떡볶이',
				// 			voteCount: 1,
				// 		},
				// 		{
				// 			menuName: '치킨',
				// 			voteCount: 1,
				// 		},
				// 	],
				// },
			],
		},
	}

	return <VoteResult result={result} />
}
