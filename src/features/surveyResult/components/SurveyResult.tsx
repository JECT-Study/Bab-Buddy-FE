'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { RecommendationCard } from './RecommendationCard'
import { RestaurantCard } from './RestaurantCard'
import { MapSection } from './MapSection'

export const SurveyResult: React.FC = () => {
	// 실제로는 API나 상태 관리를 통해 데이터를 가져와야 합니다.
	const mockData = {
		userName: '홍길동',
		recommendedMenu: '김치찌개',
		recommendationReason:
			'집밥과 한식당을 좋아하시고 생선은 피하고 싶은 당신을 위해 오늘은 김치찌개를 추천드려요 😊',
		backgroundImage: '/assets/images/kimchi-stew.jpg',
		currentLocation: {
			lat: 37.4979,
			lng: 127.0276,
		},
		restaurants: [
			{
				id: 1,
				name: '삼겹 담은 김치찌개 전문점 논현점',
				type: '한식',
				distance: '300m',
				isBookmarked: true,
				location: {
					lat: 37.4989,
					lng: 127.0276,
				},
			},
			{
				id: 2,
				name: '삼겹 담은 김치찌개 전문점 논현점',
				type: '한식',
				distance: '300m',
				isBookmarked: false,
				location: {
					lat: 37.4969,
					lng: 127.0296,
				},
			},
			{
				id: 3,
				name: '삼겹 담은 김치찌개 전문점 논현점',
				type: '한식',
				distance: '300m',
				isBookmarked: false,
				location: {
					lat: 37.4959,
					lng: 127.0256,
				},
			},
		],
	}

	return (
		<div className="flex flex-col gap-8 pr-[50px] pb-[73px] pl-[90px]">
			<RecommendationCard
				userName={mockData.userName}
				recommendedMenu={mockData.recommendedMenu}
				recommendationReason={mockData.recommendationReason}
				backgroundImage={mockData.backgroundImage}
			/>

			{/* 주변 식당 추천 섹션 */}
			<div className="flex flex-col gap-6">
				<h2 className="text-[24px] leading-[35px] font-bold tracking-[-0.04em]">
					내 주변 가장 가까운 식당 추천
				</h2>
				<div className="flex gap-6">
					<div className="flex w-[640px] flex-col gap-6">
						{mockData.restaurants.map((restaurant) => (
							<RestaurantCard
								key={restaurant.id}
								id={restaurant.id}
								name={restaurant.name}
								type={restaurant.type}
								distance={restaurant.distance}
								isBookmarked={restaurant.isBookmarked}
							/>
						))}
					</div>
					<MapSection
						currentLocation={mockData.currentLocation}
						restaurants={mockData.restaurants.map(({ id, name, location }) => ({
							id,
							name,
							location,
						}))}
					/>
				</div>
			</div>
		</div>
	)
}
