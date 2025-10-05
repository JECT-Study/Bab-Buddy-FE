import { useState } from 'react'
import { api } from '@/shared/api/client'
import type { SurveyResultInfo, SurveyResponse } from '../types/surveyResultTypes'
import type { Restaurant } from '@/features/myInfo/types/recommendationHistory'

const submitSurveyApi = async (surveyResponses: SurveyResponse): Promise<SurveyResultInfo> => {
	const response = await api.post<SurveyResultInfo>('/api/recommend', surveyResponses)
	return response.data
}

const getRestaurantListApi = async (foodId: number): Promise<Restaurant[]> => {
	const response = await api.get<Restaurant[]>(`/api/recommend/${foodId}`)
	return response.data
}

export { submitSurveyApi, getRestaurantListApi }
