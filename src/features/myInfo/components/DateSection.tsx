import React from 'react'
import { RecommendationHistory } from '@/features/myInfo/types/recommendationHistory'
import { HistoryRestaurantCard } from '@/features/myInfo/components/HistoryRestaurantCard'
import { formatUTCPlus9Date } from '@/shared/utils/formatDate'

interface DateSectionProps {
	history: RecommendationHistory
}

export const DateSection: React.FC<DateSectionProps> = ({ history }) => {
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
			<span className="text-b2-medium text-gray-30">
				추천일: {formatUTCPlus9Date(history.createAt)}
			</span>

			{/* 식당 목록 */}
			{history.restaurantList.length > 0 ? (
				<div className="grid grid-cols-3 gap-4">
					{history.restaurantList.map((restaurant) => (
						<HistoryRestaurantCard key={restaurant.id} restaurant={restaurant} />
					))}
				</div>
			) : (
				<div className="flex min-h-[138px] items-center justify-center rounded-[24px] bg-white">
					<p className="text-b2-medium text-gray-50">검색 결과가 없습니다.</p>
				</div>
			)}
		</div>
	)
}
