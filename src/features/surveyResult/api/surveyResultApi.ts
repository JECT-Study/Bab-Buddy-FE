import { useState } from 'react'
import { api } from '@/shared/api/client'
import type { SurveyResultInfo, SurveyResponse } from '../types/surveyResultTypes'
import { Restaurant } from '@/features/myInfo/types/recommendationHistory'

const submitSurveyApi = async (surveyResponses: SurveyResponse): Promise<SurveyResultInfo> => {
	const response = await api.post('/api/recommend', surveyResponses)
	return response.data
}

const getRestaurantListApi = async (foodId: number): Promise<Restaurant[]> => {
	const response = await api.get(`/api/recommend/${foodId}`)
	return response.data
}

export const useRecommendation = () => {
	const [isSurveyLoading, setIsSurveyLoading] = useState(false)
	const [isRestaurantLoading, setIsRestaurantLoading] = useState(false)

	const submitSurvey = async (surveyResponses: SurveyResponse) => {
		try {
			setIsSurveyLoading(true)
			return await submitSurveyApi(surveyResponses)
		} finally {
			setIsSurveyLoading(false)
		}
	}

	const fetchRestaurants = async (foodId: number) => {
		try {
			setIsRestaurantLoading(true)
			return await getRestaurantListApi(foodId)
		} finally {
			setIsRestaurantLoading(false)
		}
	}

	return {
		isSurveyLoading,
		isRestaurantLoading,
		submitSurvey,
		fetchRestaurants,
	}
}
