'use client'

import React, { useEffect, useState } from 'react'
import { RecommendationCard } from './RecommendationCard'
import { RestaurantCard } from './RestaurantCard'
import MapSection from './MapSection'
import { useFoodSurveyStore } from '@/features/foodSurvey/store/foodSurveyStore'
import type { SurveyResultInfo } from '../types/surveyResultTypes'
import type { Restaurant } from '@/features/myInfo/types/recommendationHistory'
import { submitSurveyApi, getRestaurantListApi, getFoodListApi } from '../api/surveyResultApi'
import { ResultLoading } from '@/shared/components/ResultLoading'
import { FoodCard } from './FoodCard'

export const SurveyResult: React.FC = () => {
	const { surveyResponses, clearResponses } = useFoodSurveyStore()
	const [surveyResult, setSurveyResult] = useState<SurveyResultInfo | null>(null)
	const [restaurants, setRestaurants] = useState<Restaurant[]>([])
	const [foods, setFoods] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)

				const result = await submitSurveyApi(surveyResponses)
				// if (!result) {
				// 	throw new Error('설문 결과를 가져올 수 없습니다.')
				// }

				setSurveyResult(result)

				const restaurantList = await getRestaurantListApi(result.id)
				setRestaurants(restaurantList || [])
				if (restaurantList.length === 0) {
					const foodList = await getFoodListApi(result.id)
					setFoods(foodList)
				}

				// API 호출이 모두 성공한 후에 clearResponses 호출
				clearResponses()
			} catch (error) {
				console.error('Error:', error)
				setError(error as Error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	// 로딩 중
	if (isLoading) {
		return <ResultLoading /> // 부모의 Suspense fallback이 표시됨
	}

	// 에러 발생
	if (error || !surveyResult) {
		return (
			<div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
				<h2 className="text-2xl font-bold">문제가 발생했습니다</h2>
				<p className="text-gray-600">{error?.message}</p>
				<button
					onClick={() => window.location.reload()}
					className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
				>
					다시 시도
				</button>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-8 pr-[50px] pb-[73px] pl-[90px]">
			<RecommendationCard
				id={surveyResult.id}
				userName={surveyResult.name}
				recommendedMenu={surveyResult.foodName}
				recommendationReason={surveyResult.foodIntroduce}
				backgroundImage={surveyResult.foodImageUrl}
			/>

			{/* 주변 식당 추천 섹션 */}
			{restaurants.length > 0 && (
				<div className="flex flex-col gap-6">
					<h2 className="text-[24px] leading-[35px] font-bold tracking-[-0.04em]">
						내 주변 가장 가까운 식당 추천
					</h2>
					<div className="flex gap-6">
						<div className="flex w-[640px] flex-col gap-6">
							{restaurants.length > 0 ? (
								restaurants.map((restaurant, index) => (
									<RestaurantCard
										key={restaurant.id}
										id={restaurant.id}
										rank={index + 1}
										name={restaurant.name}
										type={restaurant.restaurantType}
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
			)}

			{foods.length > 0 && (
				<div className="flex flex-col gap-6">
					<h2 className="text-[24px] leading-[35px] font-bold tracking-[-0.04em]">
						다른 메뉴도 추천해 드려요
					</h2>
					<div className="flex gap-12">
						<FoodCard index={2} userName={surveyResult.name} food={foods[0]} />{' '}
						<FoodCard index={3} userName={surveyResult.name} food={foods[1]} />
					</div>
				</div>
			)}
		</div>
	)
}
