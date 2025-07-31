'use client'

import React, { useEffect, useState } from 'react'
import { RecommendationCard } from './RecommendationCard'
import { RestaurantCard } from './RestaurantCard'
import MapSection from './MapSection'
import { useFoodSurveyStore } from '@/features/foodSurvey/store/foodSurveyStore'
import type { SurveyResultInfo } from '../types/surveyResultTypes'
import { Restaurant } from '@/features/myInfo/types/recommendationHistory'
import { useRecommendation } from '../api/surveyResultApi'

export const SurveyResult: React.FC = () => {
	const { surveyResponses, clearResponses } = useFoodSurveyStore()
	const [surveyResult, setSurveyResult] = useState<SurveyResultInfo | null>(null)
	const [restaurants, setRestaurants] = useState<Restaurant[]>([])
	const [error, setError] = useState<Error | null>(null)
	const { submitSurvey, fetchRestaurants, isSurveyLoading, isRestaurantLoading } =
		useRecommendation()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await submitSurvey(surveyResponses)
				if (!result) return

				setSurveyResult(result)
				const restaurantList = await fetchRestaurants(result.id)
				if (!restaurantList) return

				setRestaurants(restaurantList)
				// API 호출이 모두 성공한 후에 clearResponses 호출
				clearResponses()
			} catch (error) {
				console.error('Error:', error)
				setError(error as Error)
			}
		}

		fetchData()
	}, [])

	if (error) {
		return <div>결과를 불러오는데 실패했습니다.</div>
	}

	return (
		<div className="flex flex-col gap-8 pr-[50px] pb-[73px] pl-[90px]">
			{isSurveyLoading ? (
				<div className="h-[372px]">음식 추천 결과를 불러오는 중...</div>
			) : (
				<RecommendationCard
					userName={surveyResult?.name ?? ''}
					recommendedMenu={surveyResult?.foodName ?? ''}
					recommendationReason={surveyResult?.foodIntroduce ?? ''}
					backgroundImage={surveyResult?.foodImageUrl ?? ''}
				/>
			)}

			{/* 주변 식당 추천 섹션 */}
			<div className="flex flex-col gap-6">
				<h2 className="text-[24px] leading-[35px] font-bold tracking-[-0.04em]">
					내 주변 가장 가까운 식당 추천
				</h2>
				<div className="flex gap-6">
					<div className="flex w-[640px] flex-col gap-6">
						{isRestaurantLoading ? (
							<div>주변 식당을 검색하는 중...</div>
						) : restaurants.length > 0 ? (
							restaurants.map((restaurant, index) => (
								<RestaurantCard
									key={restaurant.id}
									id={restaurant.id}
									rank={index + 1}
									name={restaurant.name}
									type={restaurant.restaurantType}
									address={restaurant.address}
									lat={restaurant.latitude}
									lng={restaurant.longitude}
								/>
							))
						) : (
							<div>주변에 추천할 식당이 없습니다.</div>
						)}
					</div>
					<MapSection
						restaurants={
							restaurants?.map((restaurant, index) => ({
								id: restaurant.id,
								rank: index + 1,
								name: restaurant.name,
								location: {
									lat: restaurant.latitude,
									lng: restaurant.longitude,
								},
							})) || []
						}
					/>
				</div>
			</div>
		</div>
	)
}
