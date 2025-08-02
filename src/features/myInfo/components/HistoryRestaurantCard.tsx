import React from 'react'
import Icon from '../../../shared/components/Icon'
import { Restaurant } from '@/features/myInfo/types/recommendationHistory'
import { kakaoMapOpen } from '@/shared/utils/kakaoMapOpen'

interface HistoryRestaurantCardProps {
	restaurant: Restaurant
}
const handleViewDetails = (name: string, lat: number, lng: number) => {
	kakaoMapOpen(name, lat, lng)
}
export const HistoryRestaurantCard: React.FC<HistoryRestaurantCardProps> = ({ restaurant }) => {
	return (
		<div className="border-gray-10 flex min-h-[138px] flex-col justify-stretch rounded-[24px] border bg-white p-6">
			{/* 식당 정보 */}
			<div className="flex flex-1 flex-col justify-center gap-3">
				{/* 카테고리 뱃지 */}
				<div className="bg-orange self-start rounded-[20px] px-2.5 py-1 text-white">
					<span className="text-b2-medium">{restaurant.restaurantType}</span>
				</div>

				{/* 식당명과 평점 */}
				<div className="flex flex-col gap-1">
					<h3 className="text-b1-bold text-black">{restaurant.name}</h3>
				</div>

				{/* 자세히보기 */}
				<button
					onClick={() =>
						handleViewDetails(restaurant.name, restaurant.latitude, restaurant.longitude)
					}
					className="mt-auto flex items-center gap-1 self-start"
				>
					<span className="text-b2-medium text-gray-50">자세히보기</span>
					<div className="h-4 w-4">
						<Icon.ArrowRight size={16} />
					</div>
				</button>
			</div>
		</div>
	)
}
