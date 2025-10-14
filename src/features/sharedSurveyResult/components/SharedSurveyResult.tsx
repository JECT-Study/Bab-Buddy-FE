'use client'

import { useEffect, useState } from 'react'
import { RecommendationCard } from '@/features/surveyResult/components/RecommendationCard'
import { RestaurantCard } from '@/features/surveyResult/components/RestaurantCard'
import MapSection from '@/features/surveyResult/components/MapSection'
import { fetchSharedResult } from '@/features/sharedSurveyResult/api/sharedResultApi'
import type { SharedSurveyResult } from '@/features/sharedSurveyResult/types/sharedResultTypes'
import { getFoodListApi } from '@/features/surveyResult/api/surveyResultApi'
import { FoodCard } from '@/features/surveyResult/components/FoodCard'
import { ResultLoading } from '@/shared/components/ResultLoading'

interface Props {
	id: string
}

export default function SharedSurveyResult({ id }: Props) {
	const [result, setResult] = useState<SharedSurveyResult | null>(null)
	const [foods, setFoods] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const data = await fetchSharedResult(Number(id))
				if (data.restaurantRes.length === 0) {
					const foodData = await getFoodListApi(Number(id))
					setFoods(foodData)
				}
				setResult(data)
			} catch (error) {
				console.error('Error:', error)
				setError(error as Error)
			} finally {
				setIsLoading(false)
			}
		}

		if (id) {
			fetchData()
		}
	}, [id])

	// 로딩 중
	if (isLoading) {
		return <ResultLoading />
	}

	if (error || !result) {
		return <div>결과를 불러오는데 실패했습니다.</div>
	}

	return (
		<div className="flex flex-col gap-8 pr-[50px] pb-[73px] pl-[90px]">
			<RecommendationCard
				id={result.foodRes.id}
				userName={result.foodRes.name}
				recommendedMenu={result.foodRes.foodName}
				recommendationReason={result.foodRes.foodIntroduce}
				backgroundImage={result.foodRes.foodImageUrl}
			/>
			{/* 주변 식당 추천 섹션 */}
			{result?.restaurantRes?.length > 0 && (
				<div className="flex flex-col gap-6">
					<h2 className="text-[24px] leading-[35px] font-bold tracking-[-0.04em]">
						내 주변 가장 가까운 식당 추천
					</h2>
					<div className="flex gap-6">
						<div className="flex w-[640px] flex-col gap-6">
							{result?.restaurantRes.length && result.restaurantRes.length > 0 ? (
								result.restaurantRes.map((restaurant, index) => (
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
							restaurants={result?.restaurantRes.map((restaurant, index) => ({
								id: restaurant.id,
								rank: index + 1,
								name: restaurant.name,
								location: {
									lat: restaurant.latitude,
									lng: restaurant.longitude,
								},
							}))}
						/>
					</div>
				</div>
			)}

			{result && foods.length > 0 && (
				<div className="flex flex-col gap-6">
					<h2 className="text-[24px] leading-[35px] font-bold tracking-[-0.04em]">
						다른 메뉴도 추천해 드려요
					</h2>
					<div className="flex gap-12">
						<FoodCard index={2} userName={result.foodRes.name} food={foods[0]} />{' '}
						<FoodCard index={3} userName={result.foodRes.name} food={foods[1]} />
					</div>
				</div>
			)}
		</div>
	)
}
