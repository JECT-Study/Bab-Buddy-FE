import React from 'react'
import Icon from './Icon'

export interface Restaurant {
	id: string
	name: string
	category: string
	recommendedAt: string
	isBookmarked: boolean
}

interface RestaurantCardProps {
	restaurant: Restaurant
	onBookmarkToggle: (id: string) => void
	onViewDetails: (id: string) => void
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
	restaurant,
	onBookmarkToggle,
	onViewDetails,
}) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		const hours = date.getHours()
		const minutes = date.getMinutes().toString().padStart(2, '0')
		const period = hours >= 12 ? '오후' : '오전'
		const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours

		return `추천일: ${year}년 ${month}월 ${day}일 ${period} ${displayHours.toString().padStart(2, '0')}:${minutes}`
	}

	return (
		<div className="border-gray-10 flex items-center gap-[88px] rounded-3xl border bg-white p-6">
			{/* 식당 정보 */}
			<div className="flex flex-col gap-2">
				{/* 식당명과 뱃지 */}
				<div className="flex w-[260px] items-center gap-2">
					<h3 className="text-b2-medium flex-1 text-black">{restaurant.name}</h3>
					<div className="bg-orange rounded-[20px] px-2.5 py-1 text-white">
						<span className="text-b2-medium">{restaurant.category}</span>
					</div>
				</div>

				{/* 자세히보기 */}
				<button
					onClick={() => onViewDetails(restaurant.id)}
					className="flex items-center gap-1 self-start"
				>
					<span className="text-b2-medium text-gray-50">자세히보기</span>
					<div className="h-4 w-4">
						<Icon.ArrowRight />
					</div>
				</button>

				{/* 추천일 */}
				<p className="text-b2-medium text-gray-50">{formatDate(restaurant.recommendedAt)}</p>
			</div>

			{/* 북마크 아이콘 */}
			<button
				onClick={() => onBookmarkToggle(restaurant.id)}
				className="flex h-[29px] w-[29px] items-center justify-center"
			>
				<Icon.Bookmark />
			</button>
		</div>
	)
}
