import { api } from '@/shared/api/client'
import type { SurveyResultInfo, SurveyResponse } from '../types/surveyResultTypes'
import { Restaurant } from '@/features/myInfo/types/recommendationHistory'

export const submitSurvey = async (
	surveyResponses: SurveyResponse,
	signal?: AbortSignal,
): Promise<SurveyResultInfo> => {
	const response = await api.post('/api/recommend', surveyResponses, { signal })
	return response.data
}

export const getRestaurantList = async (
	foodId: number,
	signal?: AbortSignal,
): Promise<Restaurant[]> => {
	const response = await api.get(`/api/recommend/${foodId}`, { signal })
	return response.data
}
