'use client'

import Icon from '@/shared/components/Icon'
import Link from 'next/link'
import { useState } from 'react'
import type { GroupType } from '../types/group'
import { Pagination } from '@/shared/components/Pagination'
import { usePagination } from '@/shared/hooks/usePagination'

const GROUPS_PER_PAGE = 3

interface Props {
	groups: GroupType[]
}

export default function GroupList({ groups }: Props) {
	const { totalPages, page, paginatedItems, handlePageChange } = usePagination<GroupType>({
		items: groups,
		itemCountPerPage: GROUPS_PER_PAGE,
	})

	return (
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
										href={`/group/${group.roomId}/result`}
										className="bg-gray-5 text-b3-medium rounded-3xl px-4 py-2 text-gray-50"
									>
										결과확인
									</Link>
									{group.isHostUser && (
										<button type="button" className="bg-gray-5 rounded-3xl px-4 py-2">
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
	)
}
