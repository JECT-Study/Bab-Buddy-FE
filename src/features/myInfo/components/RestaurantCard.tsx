import React from 'react'
import Icon from '../../../shared/components/Icon'
import { kakaoMapOpen } from '../../../shared/utils/kakaoMapOpen'
import { BookMark } from '@/features/bookMark/components/BookMark'
import { formatUTCPlus9Date } from '@/shared/utils/formatDate'

export interface Restaurant {
	id: number
	name: string
	restaurantType: string
	latitude: number
	longitude: number
	createdAt: string
}

interface RestaurantCardProps {
	restaurant: Restaurant
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
	const onViewDetails = (name: string, lat: number, lng: number) => {
		kakaoMapOpen(name, lat, lng)
	}

	return (
		<div className="border-gray-10 flex items-center gap-[88px] rounded-3xl border bg-white p-6">
			{/* 식당 정보 */}
			<div className="flex flex-col gap-2">
				{/* 식당명과 뱃지 */}
				<div className="flex w-[260px] items-center gap-2">
					<h3 className="text-b2-medium flex-1 text-black">{restaurant.name}</h3>
					<div className="bg-orange rounded-[20px] px-2.5 py-1 text-white">
						<span className="text-b2-medium">{restaurant.restaurantType}</span>
					</div>
				</div>

				{/* 자세히보기 */}
				<button
					onClick={() => onViewDetails(restaurant.name, restaurant.latitude, restaurant.longitude)}
					className="flex items-center gap-1 self-start"
				>
					<span className="text-b2-medium text-gray-50">자세히보기</span>
					<div className="h-4 w-4">
						<Icon.ArrowRight />
					</div>
				</button>

				{/* 추천일 */}
				<p className="text-b2-medium text-gray-50">
					추천일: {formatUTCPlus9Date(restaurant.createdAt)}
				</p>
			</div>
			<BookMark restaurantId={restaurant.id} isBookmarked={true} />
		</div>
	)
}
