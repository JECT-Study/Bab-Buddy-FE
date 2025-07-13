'use client'

import Icon from '@/shared/components/Icon'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'

const GROUPS_PER_PAGE = 3

interface GroupType {
	id: number
	name: string
	members: number
	status: '참여하기' | '결과확인'
}

const mockGroups: GroupType[] = Array.from({ length: 7 }, (_, i) => ({
	id: i + 1,
	name: '회사 동료들',
	members: 4,
	status: i === 6 ? '결과확인' : '참여하기',
}))

export default function GroupList() {
	const [page, setPage] = useState(1)

	const pageCount = Math.ceil(mockGroups.length / GROUPS_PER_PAGE)
	const paginatedGroups = mockGroups.slice((page - 1) * GROUPS_PER_PAGE, page * GROUPS_PER_PAGE)

	return (
		<div className="flex flex-1 flex-col pt-6">
			<div className="flex min-h-[366px] flex-col gap-6">
				{paginatedGroups.map((group) => (
					<div
						key={group.id}
						className="border-gray-10 flex items-center justify-between rounded-3xl border px-8 py-6"
					>
						<div className="flex flex-col gap-2">
							<p className="text-b1-medium">{group.name}</p>
							<p className="text-caption-medium text-gray-50">{group.members}명</p>
						</div>
						<div className="flex items-center gap-4">
							{group.status === '참여하기' ? (
								<Link
									href="#"
									className="bg-gray-5 text-b3-medium rounded-3xl px-4 py-2 text-gray-50"
								>
									참여하기
								</Link>
							) : (
								<>
									<Link
										href="#"
										className="bg-gray-5 text-b3-medium rounded-3xl px-4 py-2 text-gray-50"
									>
										결과확인
									</Link>
									<button type="button" className="bg-gray-5 rounded-3xl px-4 py-2">
										<Icon.Trash />
									</button>
								</>
							)}
						</div>
					</div>
				))}
			</div>

			<div className="text-gray-30 mt-6 flex items-center justify-center gap-4">
				<button
					type="button"
					onClick={() => setPage((p) => Math.max(p - 1, 1))}
					// disabled={page === 1}
					// className="disabled:text-gray-5"
				>
					<Icon.ArrowLeft />
				</button>

				{Array.from({ length: pageCount }, (_, i) => (
					<button
						key={i + 1}
						onClick={() => setPage(i + 1)}
						className={clsx(
							'flex h-7.5 w-7.5 items-center justify-center rounded-full',
							page === i + 1 && 'bg-gray-5',
						)}
					>
						{i + 1}
					</button>
				))}

				<button
					type="button"
					onClick={() => setPage((p) => Math.min(p + 1, pageCount))}
					// disabled={page === pageCount}
					// className="disabled:text-gray-5"
				>
					<Icon.ArrowRight />
				</button>
			</div>
		</div>
	)
}
