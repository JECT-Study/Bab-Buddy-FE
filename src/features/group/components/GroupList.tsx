'use client'

import Icon from '@/shared/components/Icon'
import Link from 'next/link'
import type { GroupType } from '../types/group'
import { Pagination } from '@/shared/components/Pagination'
import { usePagination } from '@/shared/hooks/usePagination'
import { getGroupsOnClient } from '../api/groupListApi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import GroupEmpty from './GroupEmpty'
import { deleteVoteRoom } from '../api/voteRoomApi'

const GROUPS_PER_PAGE = 3
const DEFAULT_POLLING_INTERVAL = 5000

export const useGroupList = (pollingInterval = DEFAULT_POLLING_INTERVAL) => {
	return useQuery({
		queryKey: ['groups'],
		queryFn: getGroupsOnClient,
		refetchInterval: pollingInterval, // 5초마다 자동 폴링
		// refetchIntervalInBackground: true, // 백그라운드에서도 폴링
		refetchOnWindowFocus: true, // 윈도우 포커스 시 리페치
		staleTime: pollingInterval, // 3초 동안은 캐시 사용
	})
}

export default function GroupList() {
	const queryClient = useQueryClient()
	const { data: groups = [] } = useGroupList()
	const { totalPages, page, paginatedItems, handlePageChange } = usePagination<GroupType>({
		items: groups,
		itemCountPerPage: GROUPS_PER_PAGE,
	})

	if (groups.length === 0) {
		return <GroupEmpty />
	}

	const handleDeleteGroup = async (roomId: string) => {
		await deleteVoteRoom(roomId)
		queryClient.invalidateQueries({ queryKey: ['groups'] })
	}

	return (
		<div className="flex min-h-[283px] items-center justify-center">
			<div className="flex flex-1 flex-col py-6">
				<div className="flex min-h-[294px] flex-col gap-6">
					{paginatedItems.map((group) => (
						<div
							key={group.roomId}
							className="border-gray-10 flex max-h-[82px] items-center justify-between rounded-3xl border px-8 py-6"
						>
							<div className="flex flex-col gap-2">
								<p className="text-b1-medium">{group.title}</p>
								<p className="text-caption-medium text-gray-50">{group.participantCount}명</p>
							</div>
							<div className="flex items-center gap-4">
								{group.voteStatus === 'ONGOING' ? (
									<Link
										href={`/group/${group.roomId}`}
										className="bg-gray-5 text-b3-medium rounded-3xl px-4 py-2 text-gray-50"
									>
										참여하기
									</Link>
								) : (
									<>
										<Link
											href={`/group/${group.roomId}${group.menuSelectMethod === 'VOTE' ? '/result' : ''}`}
											className="bg-gray-5 text-b3-medium rounded-3xl px-4 py-2 text-gray-50"
										>
											결과확인
										</Link>
										{group.isHostUser && (
											<button
												type="button"
												className="bg-gray-5 rounded-3xl px-4 py-2"
												onClick={() => handleDeleteGroup(group.roomId)}
											>
												<Icon.Trash />
											</button>
										)}
									</>
								)}
							</div>
						</div>
					))}
				</div>

				<div className="mt-6 flex items-center justify-center gap-4">
					<Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
				</div>
			</div>
		</div>
	)
}
