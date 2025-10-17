import { useEffect, useState } from 'react'
import { useFoodSurveyStore } from '@/features/foodSurvey/store/foodSurveyStore'
import type { SurveyResultInfo } from '../types/surveyResultTypes'
import type { Restaurant } from '@/features/myInfo/types/recommendationHistory'
import { submitSurveyApi, getRestaurantListApi, getFoodListApi } from '../api/surveyResultApi'

export const useSurveyResult = () => {
	const { surveyResponses, clearResponses, _hasHydrated } = useFoodSurveyStore()
	const [surveyResult, setSurveyResult] = useState<SurveyResultInfo | null>(null)
	const [restaurants, setRestaurants] = useState<Restaurant[]>([])
	const [foods, setFoods] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		// Hydration 완료될 때까지 대기
		if (!_hasHydrated) return
		const fetchData = async () => {
			try {
				setIsLoading(true)

				const result = await submitSurveyApi(surveyResponses)
				setSurveyResult(result)

				const restaurantList = await getRestaurantListApi(result.id)
				setRestaurants(restaurantList || [])

				if (restaurantList.length === 0) {
					const foodList = await getFoodListApi(result.id)
					setFoods(foodList)
				}

				clearResponses()
			} catch (error) {
				console.error('Error:', error)
				setError(error as Error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		surveyResult,
		restaurants,
		foods,
		isLoading,
		error,
	}
}
