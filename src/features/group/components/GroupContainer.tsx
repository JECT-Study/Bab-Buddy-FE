'use client'

import GroupEmpty from '@/features/group/components/GroupEmpty'
import GroupList from '@/features/group/components/GroupList'
import type { GroupType } from '../types/data'

interface Props {
	mockData: GroupType[]
}

export default function GroupContainer({ mockData }: Props) {
	return (
		<>
			{mockData.length ? <GroupList mockData={mockData} /> : <GroupEmpty />}

			<button
				type="button"
				className="bg-orange text-h3-medium mt-6 flex w-[640px] flex-1 justify-center rounded-3xl px-9 py-4 text-white"
			>
				새 그룹 만들기
			</button>
		</>
	)
}
