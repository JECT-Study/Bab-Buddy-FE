'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Icon from '../Icon'

interface PaginationProps {
	totalCount: number
	itemsPerPage?: number
	onChange?: (page: number) => void
	initialPage?: number
}

const DEFAULT_ITEMS_PER_PAGE = 6
const MAX_VISIBLE_PAGES = 5

export default function Pagination({
	totalCount,
	itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
	onChange,
	initialPage = 1,
}: PaginationProps) {
	const [currentPage, setCurrentPage] = useState(initialPage)

	// 최소 1페이지 보장 (0 건이어도 비활성 상태의 1페이지 형태 유지)
	const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage))

	// totalCount 변동 시 현재 페이지가 범위를 벗어나면 보정
	useEffect(() => {
		if (currentPage > totalPages) setCurrentPage(totalPages)
	}, [totalPages, currentPage])

	// 규칙:
	// - 총 페이지 <= 5: 전부 노출
	// - 총 페이지 >= 6: 현재 페이지를 중심으로 5개 윈도우로 슬라이딩 (예: 23(4)56 -> 34(5)67)
	const visiblePages = useMemo(() => {
		if (totalPages <= MAX_VISIBLE_PAGES) {
			return Array.from({ length: totalPages }, (_, i) => i + 1)
		}
		let start = currentPage - Math.floor(MAX_VISIBLE_PAGES / 2)
		let end = currentPage + Math.floor(MAX_VISIBLE_PAGES / 2)

		if (start < 1) {
			start = 1
			end = start + MAX_VISIBLE_PAGES - 1
		} else if (end > totalPages) {
			end = totalPages
			start = end - MAX_VISIBLE_PAGES + 1
		}
		return Array.from({ length: end - start + 1 }, (_, i) => start + i)
	}, [currentPage, totalPages])

	const goTo = useCallback(
		(page: number) => {
			const next = Math.min(Math.max(1, page), totalPages)
			if (next !== currentPage) {
				setCurrentPage(next)
				onChange?.(next)
			}
		},
		[currentPage, totalPages, onChange],
	)

	const goPrev = useCallback(() => goTo(currentPage - 1), [goTo, currentPage])
	const goNext = useCallback(() => goTo(currentPage + 1), [goTo, currentPage])

	return (
		<div className="flex w-full items-center justify-center gap-2">
			<button
				onClick={goPrev}
				disabled={totalPages <= 1 || currentPage === 1}
				className="p-1 outline-none"
				aria-label="이전 페이지"
			>
				<Icon.ArrowLeft size={16} className={currentPage === 1 ? 'text-gray-10' : 'text-gray-30'} />
			</button>

			<ul className="flex items-center justify-center gap-2">
				{visiblePages.map((page) => (
					<li key={page}>
						<button
							onClick={() => goTo(page)}
							className={`text-b2-medium rounded px-3 py-1 ${
								page === currentPage ? 'bg-gray-5' : 'bg-transparent'
							}`}
							aria-current={page === currentPage ? 'page' : undefined}
						>
							{page}
						</button>
					</li>
				))}
			</ul>

			<button
				onClick={goNext}
				disabled={totalPages <= 1 || currentPage === totalPages}
				className="p-1 outline-none"
				aria-label="다음 페이지"
			>
				<Icon.ArrowRight
					size={16}
					className={currentPage === totalPages ? 'text-gray-10' : 'text-gray-30'}
				/>
			</button>
		</div>
	)
}
