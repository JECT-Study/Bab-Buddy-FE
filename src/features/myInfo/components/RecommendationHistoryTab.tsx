import React, { useState } from 'react'
import { FilterButtons, FilterCategory } from '@/shared/components/FilterButtons'
import { SortDropdown, SortOption } from '@/shared/components/SortDropdown'
import { Pagination } from '@/shared/components/Pagination'
import { DateSection } from '@/features/myInfo/components/DateSection'
import { RecommendationHistory } from '@/features/myInfo/types/recommendationHistory'

export const RecommendationHistoryTab: React.FC = () => {
	// 추천 히스토리 관련 상태들 (실제 응답 데이터 형식에 맞춤)
	const [recommendationHistory] = useState<RecommendationHistory[]>([
		{
			foodName: '제육볶음',
			createAt: '2025-01-13T18:38:56.260702',
			restaurantList: [
				{
					id: 1,
					name: '오구당당 부평본점',
					restaurantType: '한식',
					address: '인천광역시 부평구 경원대로1377번길 47',
					rating: '4.5',
					latitude: 37.4934655,
					longitude: 126.7220715,
					createdAt: '2025-01-13T18:38:56.260702',
				},
				{
					id: 3,
					name: '불타는 주먹다짐',
					restaurantType: '한식',
					address: '인천광역시 부평구 경원대로 1422 대덕아크로존',
					rating: '4.5',
					latitude: 37.4909456,
					longitude: 126.7270929,
					createdAt: '2025-01-13T18:38:56.260702',
				},
			],
		},
		{
			foodName: '삼겹살',
			createAt: '2025-01-13T18:41:40.337095',
			restaurantList: [
				{
					id: 7,
					name: '미차오름 본점',
					restaurantType: '한식',
					address: '인천광역시 부평구 경원대로1403번길 38-19 2층',
					rating: '4.5',
					latitude: 37.4928552,
					longitude: 126.7267651,
					createdAt: '2025-01-13T18:41:40.337095',
				},
				{
					id: 8,
					name: '동두천솥뚜껑삼겹살 부평점',
					restaurantType: '한식',
					address: '인천광역시 부평구 시장로12번길 20 1층',
					rating: '4.5',
					latitude: 37.4917804,
					longitude: 126.7255206,
					createdAt: '2025-01-13T18:41:40.337095',
				},
			],
		},
		{
			foodName: '김치찌개',
			createAt: '2025-01-13T18:42:57.483627',
			restaurantList: [], // 빈 결과 예시
		},
	])

	const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('전체')
	const [selectedSort, setSelectedSort] = useState<SortOption>('최신순')
	const [currentPage, setCurrentPage] = useState(1)

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

	const handleViewDetails = (restaurantId: number) => {
		// TODO: 식당 상세보기 처리
		console.log('View details for restaurant:', restaurantId)
	}

	// 필터링 및 정렬된 히스토리 계산
	const getFilteredAndSortedHistory = (): RecommendationHistory[] => {
		let filteredHistory = [...recommendationHistory]

		// 카테고리 필터링
		if (selectedCategory !== '전체') {
			filteredHistory = filteredHistory.filter((history) =>
				history.restaurantList.some((restaurant) => restaurant.restaurantType === selectedCategory),
			)
		}

		// 정렬
		filteredHistory.sort((a, b) => {
			switch (selectedSort) {
				case '최신순':
					return new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
				case '등록순':
					return new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
				default:
					return 0
			}
		})

		return filteredHistory
	}

	const filteredHistory = getFilteredAndSortedHistory()

	// 히스토리 페이지네이션
	const historyItemsPerPage = 3 // 3개 히스토리 섹션씩
	const totalPages = Math.ceil(filteredHistory.length / historyItemsPerPage)
	const startIndex = (currentPage - 1) * historyItemsPerPage
	const currentHistoryList = filteredHistory.slice(startIndex, startIndex + historyItemsPerPage)

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
			{currentHistoryList.length > 0 ? (
				<div className="flex flex-col gap-6">
					{currentHistoryList.map((history, index) => (
						<DateSection
							key={`${history.createAt}-${history.foodName}-${index}`}
							history={history}
							onViewDetails={handleViewDetails}
						/>
					))}
				</div>
			) : (
				<div className="border-gray-10 flex min-h-[300px] items-center justify-center rounded-[24px] border">
					<p className="text-b2-medium text-gray-40">추천 히스토리가 없습니다.</p>
				</div>
			)}

			{/* 페이지네이션 */}
			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</div>
	)
}
