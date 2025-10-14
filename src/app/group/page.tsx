import { getGroups } from '@/features/group/api/groupListApi'
import GroupContainer from '@/features/group/components/GroupContainer'
// import type { GroupType } from '@/features/group/types/group'

// TODO :: 목데이터 변경 필요
// const groups: GroupType[] = Array.from({ length: 7 }, (_, i) => ({
// 	roomId: i + 1 + '',
// 	title: '회사 동료들' + (i + 1),
// 	participantCount: i + 1,
// 	voteStatus: i % 3 !== 0 ? 'ONGOING' : 'FINISHED',
// 	isHostUser: i % 3 === 0,
// }))

export default async function GroupPage() {
	const groups = (await getGroups()) || []

	return (
		<>
			<div className="flex w-[75%] flex-col items-center gap-6 rounded-3xl bg-white p-6">
				<div className="flex flex-col items-center gap-6 py-6">
					<h2 className="text-h2-bold">모두와 함께 음식 정하기</h2>
					<article className="flex w-[640px] flex-1 flex-col">
						<strong className="text-b1-bold">최근 생성된 그룹방</strong>
						<GroupContainer groups={groups} />
					</article>
				</div>
			</div>
		</>
	)
}
