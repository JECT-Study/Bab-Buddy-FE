import React from 'react'
import Icon from './Icon'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1)
		}
	}

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1)
		}
	}

	// 표시할 페이지 번호들 계산
	const getVisiblePages = () => {
		const maxVisible = 5
		const pages = []

		let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
		let end = Math.min(totalPages, start + maxVisible - 1)

		// end가 마지막 페이지에 가까울 때 start 조정
		if (end - start + 1 < maxVisible) {
			start = Math.max(1, end - maxVisible + 1)
		}

		for (let i = start; i <= end; i++) {
			pages.push(i)
		}

		return pages
	}

	const visiblePages = getVisiblePages()

	return (
		<div className="flex items-center justify-center gap-4">
			{/* 이전 페이지 버튼 */}
			<button
				onClick={handlePrevious}
				disabled={currentPage === 1}
				className="flex h-5 w-5 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
			>
				<Icon.ArrowLeft className="text-gray-30" />
			</button>

			{/* 페이지 번호들 */}
			{visiblePages.map((pageNum) => (
				<button
					key={pageNum}
					onClick={() => onPageChange(pageNum)}
					className={`flex h-[30px] w-[30px] items-center justify-center rounded-3xl transition-colors ${
						pageNum === currentPage
							? 'bg-gray-5 text-gray-30'
							: 'text-gray-30 hover:bg-gray-5 bg-transparent'
					}`}
				>
					<span className="text-c-medium">{pageNum}</span>
				</button>
			))}

			{/* 다음 페이지 버튼 */}
			<button
				onClick={handleNext}
				disabled={currentPage === totalPages}
				className="flex h-5 w-5 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
			>
				<Icon.ArrowRight />
			</button>
		</div>
	)
}
