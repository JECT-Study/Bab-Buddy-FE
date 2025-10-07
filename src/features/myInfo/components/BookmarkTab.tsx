import React, { useState, useEffect } from 'react'
import { RestaurantCard } from '@/features/myInfo/components/RestaurantCard'
import { FilterButtons } from '@/shared/components/FilterButtons'
import { SortDropdown } from '@/shared/components/SortDropdown'
import { Pagination } from '@/shared/components/Pagination'
import { getBookmark } from '../api/bookmarkApi'
import { getConvertCategory } from '@/shared/hooks/useCategory'
import type { Restaurant } from '../types/recommendationHistory'
import type { FilterCategory } from '@/shared/components/FilterButtons'
import type { SortOption } from '@/shared/components/SortDropdown'
import type { BookmarkResponse } from '../types/bookmark'
import { NoData } from './NoData'

export const BookmarkTab: React.FC = () => {
	const [bookmarkedRestaurants, setBookmarkedRestaurants] = useState<Restaurant[]>([])

	const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('전체')
	const [selectedSort, setSelectedSort] = useState<SortOption>('최신순')
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)

	const fetchBookmark = async () => {
		const response: BookmarkResponse = await getBookmark(
			getConvertCategory(selectedCategory),
			selectedSort === '최신순' ? 'LATEST' : 'OLDEST',
			currentPage,
		)
		setBookmarkedRestaurants(response.content)
		setTotalPages(response.totalPages)
	}

	useEffect(() => {
		fetchBookmark()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategory, selectedSort, currentPage])

	// 필터나 정렬 변경 시 첫 페이지로 리셋
	const handleCategoryChange = (category: FilterCategory) => {
		setSelectedCategory(category)
		setCurrentPage(1)
	}

	const handleSortChange = (sort: SortOption) => {
		setSelectedSort(sort)
		setCurrentPage(1)
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

			{/* 식당 카드 그리드 */}
			{bookmarkedRestaurants.length > 0 ? (
				<>
					<div className="grid grid-cols-2 gap-6">
						{bookmarkedRestaurants.map((restaurant) => (
							<RestaurantCard key={restaurant.id} restaurant={restaurant} />
						))}
					</div>
					{/* 페이지네이션 */}
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				</>
			) : (
				<NoData
					title="아직 북마크한 식당이 없어요."
					subTitle="추천받은 식당에서 마음에 드는 곳을 북마크하면\n여기서 따로 모아볼 수 있어요."
				/>
			)}
		</div>
	)
}
