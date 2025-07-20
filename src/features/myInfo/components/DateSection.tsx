import React from 'react'
import { RecommendationHistory } from '@/features/myInfo/types/recommendationHistory'
import { HistoryRestaurantCard } from '@/features/myInfo/components/HistoryRestaurantCard'

interface DateSectionProps {
	history: RecommendationHistory
	onViewDetails: (restaurantId: number) => void
}

export const DateSection: React.FC<DateSectionProps> = ({ history, onViewDetails }) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('ko-KR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			weekday: 'long',
		})
	}

	const formatTime = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleTimeString('ko-KR', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		})
	}

	return (
		<div className="mb-8">
			{/* 날짜 헤더 */}
			<div className="mb-4 flex flex-col">
				<div className="flex items-center gap-2">
					<span className="text-b1-bold text-black">{formatDate(history.createAt)}</span>
					<span className="text-b2-medium text-gray-50">{formatTime(history.createAt)}</span>
				</div>
				<span className="text-b2-medium text-gray-70">추천 음식: {history.foodName}</span>
			</div>

			{/* 식당 목록 */}
			{history.restaurantList.length > 0 ? (
				<div className="grid grid-cols-1 gap-4">
					{history.restaurantList.map((restaurant) => (
						<HistoryRestaurantCard
							key={restaurant.id}
							restaurant={restaurant}
							onViewDetails={onViewDetails}
						/>
					))}
				</div>
			) : (
				<div className="border-gray-10 flex min-h-[138px] items-center justify-center rounded-[24px] border bg-white">
					<p className="text-b2-medium text-gray-40">추천된 식당이 없습니다.</p>
				</div>
			)}
		</div>
	)
}
