'use client'

import React from 'react'
import Icon from '@/shared/components/Icon'
import { useLocationStore } from '@/shared/store/locationStore'
import { calculateDistance, formatDistance } from '@/shared/utils/distance'

interface RestaurantCardProps {
	id: number
	rank: number
	name: string
	type: string
	address: string
	lat: number
	lng: number
	isBookmarked: boolean
}
export const RestaurantCard: React.FC<RestaurantCardProps> = ({
	id,
	rank,
	name,
	type,
	address,
	lat,
	lng,
	isBookmarked,
}) => {
	const { location } = useLocationStore()
	const distanceInMeters = calculateDistance(location, { lat, lng })
	const formattedDistance = formatDistance(distanceInMeters)
	const onBookmarkClick = () => {
		console.log('bookmark')
	}
	const onDetailClick = () => {
		console.log('detail')
	}

	return (
		<div className="flex items-center justify-between rounded-[24px] border border-[#E0E0E0] p-6">
			<div className="flex items-center gap-8">
				<span className="text-[32px] leading-[42px] font-bold tracking-[-0.04em]">{rank}</span>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<span className="text-[16px] leading-[24px] font-medium tracking-[-0.02em]">
							{name}
						</span>
						<span className="rounded-[20px] bg-[#EA580C] px-[10px] py-[1px] text-[16px] leading-[24px] font-medium tracking-[-0.02em] text-white">
							{type}
						</span>
					</div>
					<div className="flex items-center gap-1">
						<Icon.Location className="h-3 w-3 text-[#777677]" />
						<span className="text-[15px] leading-[23px] font-medium tracking-[-0.02em] text-[#777677]">
							{formattedDistance}
						</span>
					</div>
					<button
						onClick={onDetailClick}
						className="flex items-center gap-2 text-[16px] leading-[24px] font-medium tracking-[-0.02em] text-[#777677]"
					>
						자세히보기
						<Icon.ArrowRight className="text-[#777677]" size={16} />
					</button>
				</div>
			</div>
			<button onClick={onBookmarkClick}>
				<Icon.Bookmark
					className={`h-[45px] w-[45px] ${isBookmarked ? 'text-[#FDDC3F]' : 'text-[#AEAEAE]'}`}
				/>
			</button>
		</div>
	)
}
