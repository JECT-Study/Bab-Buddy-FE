import React, { useState } from 'react'
import { RestaurantCard, Restaurant } from '@/shared/components/RestaurantCard'
import { FilterButtons, FilterCategory } from '@/shared/components/FilterButtons'
import { SortDropdown, SortOption } from '@/shared/components/SortDropdown'
import { Pagination } from '@/shared/components/Pagination'

export const BookmarkTab: React.FC = () => {
	// 북마크 관련 상태들
	const [bookmarkedRestaurants, setBookmarkedRestaurants] = useState<Restaurant[]>([
		{
			id: '1',
			name: '삼겹 담은 김치찌개 전문점 논현점',
			category: '한식',
			recommendedAt: '2024-01-13T21:45:00Z',
			isBookmarked: true,
		},
		{
			id: '2',
			name: '마라탕 전문점 강남점',
			category: '중식',
			recommendedAt: '2024-01-14T12:30:00Z',
			isBookmarked: true,
		},
		{
			id: '3',
			name: '스시 오마카세 청담점',
			category: '일식',
			recommendedAt: '2024-01-15T19:20:00Z',
			isBookmarked: true,
		},
		{
			id: '4',
			name: '이탈리안 레스토랑 압구정점',
			category: '양식',
			recommendedAt: '2024-01-16T18:15:00Z',
			isBookmarked: true,
		},
		{
			id: '5',
			name: '태국 음식 전문점',
			category: '기타',
			recommendedAt: '2024-01-17T20:00:00Z',
			isBookmarked: true,
		},
		{
			id: '6',
			name: '한우 갈비 전문점',
			category: '한식',
			recommendedAt: '2024-01-18T17:30:00Z',
			isBookmarked: true,
		},
		{
			id: '7',
			name: '태국 음식 전문점',
			category: '기타',
			recommendedAt: '2024-01-17T20:00:00Z',
			isBookmarked: true,
		},
		{
			id: '8',
			name: '태국 음식 전문점',
			category: '기타',
			recommendedAt: '2024-01-17T20:00:00Z',
			isBookmarked: true,
		},
		{
			id: '9',
			name: '태국 음식 전문점',
			category: '기타',
			recommendedAt: '2024-01-17T20:00:00Z',
			isBookmarked: true,
		},
		{
			id: '10',
			name: '태국 음식 전문점',
			category: '기타',
			recommendedAt: '2024-01-17T20:00:00Z',
			isBookmarked: true,
		},
		{
			id: '11',
			name: '태국 음식 전문점',
			category: '기타',
			recommendedAt: '2024-01-17T20:00:00Z',
			isBookmarked: true,
		},
		{
			id: '12',
			name: '태국 음식 전문점',
			category: '기타',
			recommendedAt: '2024-01-17T20:00:00Z',
			isBookmarked: true,
		},
	])

	const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('전체')
	const [selectedSort, setSelectedSort] = useState<SortOption>('최신순')
	const [currentPage, setCurrentPage] = useState(1)

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
