import React, { useState, useEffect } from 'react'
import { FilterButtons } from '@/shared/components/FilterButtons'
import { SortDropdown } from '@/shared/components/SortDropdown'
import { Pagination } from '@/shared/components/Pagination'
import { DateSection } from '@/features/myInfo/components/DateSection'
import type {
	RecommendationHistory,
	RecommendationHistoryResponse,
} from '@/features/myInfo/types/recommendationHistory'
import { getRecommendationHistory } from '../api/recommendationHistoryApi'
import { getConvertCategory } from '@/shared/hooks/useCategory'
import type { FilterCategory } from '@/shared/components/FilterButtons'
import type { SortOption } from '@/shared/components/SortDropdown'
import { NoData } from './NoData'

export const RecommendationHistoryTab: React.FC = () => {
	const [recommendationHistory, setRecommendationHistory] = useState<RecommendationHistory[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)

	const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('전체')
	const [selectedSort, setSelectedSort] = useState<SortOption>('최신순')
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	// API 호출 함수
	const fetchHistory = async () => {
		try {
			setIsLoading(true)
			const category = getConvertCategory(selectedCategory)

			const order = selectedSort === '최신순' ? 'LATEST' : 'OLDEST'
			const response: RecommendationHistoryResponse = await getRecommendationHistory(
				category,
				order,
				currentPage,
				6,
			)
			setRecommendationHistory(response.content)
			setTotalPages(response.totalPages)
		} catch (err) {
			console.error('Failed to fetch recommendation history:', err)
			setError(err as Error)
		} finally {
			setIsLoading(false)
		}
	}

	// 필터, 정렬, 페이지 변경시 API 재호출
	useEffect(() => {
		fetchHistory()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategory, selectedSort, currentPage])

	// 상태 업데이트 핸들러들
	const handleCategoryChange = (category: FilterCategory) => {
		setSelectedCategory(category)
		setCurrentPage(1) // 필터 변경시 첫 페이지로
	}

	const handleSortChange = (sort: SortOption) => {
		setSelectedSort(sort)
		setCurrentPage(1) // 정렬 변경시 첫 페이지로
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	return (
		<div className="flex flex-col gap-6">
			{/* 필터 및 정렬 */}
			<div className="flex items-center justify-between">
				<FilterButtons
					selectedCategory={selectedCategory}
					onCategoryChange={handleCategoryChange}
				/>
				<SortDropdown selectedSort={selectedSort} onSortChange={handleSortChange} />
			</div>

			{/* 추천 히스토리 */}
			{isLoading ? (
				<div className="border-gray-10 flex min-h-[300px] items-center justify-center rounded-[24px] border">
					<div className="animate-pulse">
						<div className="mb-4 h-8 w-32 rounded bg-gray-200" />
						<div className="space-y-3">
							<div className="h-4 w-3/4 rounded bg-gray-200" />
							<div className="h-4 rounded bg-gray-200" />
							<div className="h-4 w-5/6 rounded bg-gray-200" />
						</div>
					</div>
				</div>
			) : error ? (
				<div className="border-gray-10 flex min-h-[300px] items-center justify-center rounded-[24px] border">
					<p className="text-red-500">추천 히스토리를 불러오는데 실패했습니다.</p>
				</div>
			) : recommendationHistory.length < 0 ? (
				<>
					<div className="flex flex-col gap-6">
						{recommendationHistory.map((history, index) => (
							<DateSection
								key={`${history.createAt}-${history.foodName}-${index}`}
								history={history}
							/>
						))}
					</div>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</>
			) : (
				<NoData
					title="아직 추천 받은 기록이 없어요."
					subTitle="개인 메뉴 추천에서 내 기분과 취향에 맞는 식당을 \n 추천받아보세요! 여기에 추천 결과가 저장돼요."
				/>
			)}
		</div>
	)
}
