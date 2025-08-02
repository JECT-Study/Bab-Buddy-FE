import React, { useState, useEffect } from 'react'
import { RestaurantCard, Restaurant } from '@/shared/components/RestaurantCard'
import { FilterButtons, FilterCategory } from '@/shared/components/FilterButtons'
import { SortDropdown, SortOption } from '@/shared/components/SortDropdown'
import { Pagination } from '@/shared/components/Pagination'
import { getBookmark } from '../api/bookmarkApi'
import { getConvertCategory } from '@/shared/hooks/useCategory'

export const BookmarkTab: React.FC = () => {
	const [bookmarkedRestaurants, setBookmarkedRestaurants] = useState<Restaurant[]>([])

	const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('전체')
	const [selectedSort, setSelectedSort] = useState<SortOption>('최신순')
	const [currentPage, setCurrentPage] = useState(1)

	const fetchBookmark = async () => {
		const response = await getBookmark(
			getConvertCategory(selectedCategory),
			selectedSort === '최신순' ? 'LATEST' : 'OLDEST',
			currentPage,
			6,
		)
		setBookmarkedRestaurants(response as unknown as Restaurant[])
	}

	useEffect(() => {
		fetchBookmark()
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

	const handleBookmarkToggle = (restaurantId: string) => {
		setBookmarkedRestaurants((prev) =>
			prev.map((restaurant) =>
				restaurant.id === restaurantId
					? { ...restaurant, isBookmarked: !restaurant.isBookmarked }
					: restaurant,
			),
		)
		// TODO: API 호출 추가
	}

	const handleViewDetails = (restaurantId: string) => {
		console.log('자세히보기 클릭:', restaurantId)
		// TODO: 식당 상세 페이지로 이동
	}

	// 필터링 및 정렬된 식당 목록
	const getFilteredAndSortedRestaurants = () => {
		let filtered = bookmarkedRestaurants.filter((restaurant) => restaurant.isBookmarked)

		// 카테고리 필터링
		if (selectedCategory !== '전체') {
			filtered = filtered.filter((restaurant) => restaurant.category === selectedCategory)
		}

		// 정렬
		filtered.sort((a, b) => {
			switch (selectedSort) {
				case '최신순':
					return new Date(b.recommendedAt).getTime() - new Date(a.recommendedAt).getTime()
				case '오래된순':
					return new Date(a.recommendedAt).getTime() - new Date(b.recommendedAt).getTime()
				default:
					return 0
			}
		})

		return filtered
	}

	const filteredRestaurants = getFilteredAndSortedRestaurants()

	// 페이지네이션
	const itemsPerPage = 12
	const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const restaurants = filteredRestaurants.slice(startIndex, startIndex + itemsPerPage)
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
			{restaurants.length > 0 ? (
				<div className="grid grid-cols-2 gap-6">
					{restaurants.map((restaurant) => (
						<RestaurantCard
							key={restaurant.id}
							restaurant={restaurant}
							onBookmarkToggle={handleBookmarkToggle}
							onViewDetails={handleViewDetails}
						/>
					))}
				</div>
			) : (
				<div className="border-gray-10 rounded-3xl border bg-white p-6 text-center">
					<h2 className="text-h3-bold text-black">북마크</h2>
					<p className="text-b2-medium text-gray-30 mt-4">북마크한 음식이 없습니다.</p>
				</div>
			)}

			{/* 페이지네이션 */}
			<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
		</div>
	)
}
