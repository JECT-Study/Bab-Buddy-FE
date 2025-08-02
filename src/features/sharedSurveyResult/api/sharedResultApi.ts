import { api } from '@/shared/api/client'
import { SharedSurveyResult } from '@/features/sharedSurveyResult/types/sharedResultTypes'

export const fetchSharedResult = async (foodId: number): Promise<SharedSurveyResult> => {
	const response = await api.get(`/api/recommend/all/${foodId}`)
	return response.data
}
