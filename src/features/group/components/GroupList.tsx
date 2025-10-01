'use client'

import Icon from '@/shared/components/Icon'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import type { GroupType } from '../types/group'

const GROUPS_PER_PAGE = 3

interface Props {
	groups: GroupType[]
}

export default function GroupList({ groups }: Props) {
	const [page, setPage] = useState(1)

	const pageCount = Math.ceil(groups.length / GROUPS_PER_PAGE)
	const paginatedGroups = groups.slice((page - 1) * GROUPS_PER_PAGE, page * GROUPS_PER_PAGE)

	return (
		<div className="flex flex-1 flex-col pt-6">
			<div className="flex min-h-[366px] flex-col gap-6">
				{paginatedGroups.map((group) => (
					<div
						key={group.roomId}
						className="border-gray-10 flex items-center justify-between rounded-3xl border px-8 py-6"
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
				<button type="button" onClick={() => setPage((p) => Math.max(p - 1, 1))}>
					<Icon.ArrowLeft className={clsx(page !== 1 && 'text-gray-50')} />
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

				<button type="button" onClick={() => setPage((p) => Math.min(p + 1, pageCount))}>
					<Icon.ArrowRight className={clsx(page !== pageCount && 'text-gray-50')} />
				</button>
			</div>
		</div>
	)
}
