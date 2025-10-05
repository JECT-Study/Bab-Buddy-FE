import { api } from '@/shared/api/client'
import type { SurveyResultInfo, SurveyResponse, FoodResponse } from '../types/surveyResultTypes'
import type { Restaurant } from '@/features/myInfo/types/recommendationHistory'

const submitSurveyApi = async (surveyResponses: SurveyResponse): Promise<SurveyResultInfo> => {
	const response = await api.post<SurveyResultInfo>('/api/recommend', surveyResponses)
	return response.data
}

const getRestaurantListApi = async (foodId: number): Promise<Restaurant[]> => {
	const response = await api.get<Restaurant[]>(`/api/recommend/${foodId}`)
	return response.data
}

const getFoodListApi = async (foodId: number): Promise<string[]> => {
	const response = await api.get<FoodResponse[]>(`/api/recommend/prepared/${foodId}`)
	return response.data.map((item) => item.foodName)
}
export { submitSurveyApi, getRestaurantListApi, getFoodListApi }
