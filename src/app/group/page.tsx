import GroupContainer from '@/features/group/components/GroupContainer'
import type { GroupType } from '@/features/group/types/data'

// TODO :: 목데이터 변경 필요
const mockGroups: GroupType[] = Array.from({ length: 7 }, (_, i) => ({
	id: i + 1,
	name: '회사 동료들',
	members: 4,
	status: i === 6 ? '결과확인' : '참여하기',
}))

export default function GroupPage() {
	return (
		<>
			<div className="flex flex-1 flex-col items-center gap-6 py-6">
				<h2 className="text-h2-bold">모두와 함께 음식 정하기</h2>
				<article className="flex w-[640px] flex-1 flex-col">
					<strong className="text-b1-bold">최근 생성된 그룹방</strong>
					<GroupContainer mockData={mockGroups} />
				</article>
			</div>
		</>
	)
}
