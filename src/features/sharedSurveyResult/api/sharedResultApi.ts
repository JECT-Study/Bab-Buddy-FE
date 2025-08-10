import { api } from '@/shared/api/client'
import type { SharedSurveyResult } from '@/features/sharedSurveyResult/types/sharedResultTypes'

export const fetchSharedResult = async (foodId: number): Promise<SharedSurveyResult> => {
	const response = await api.get<SharedSurveyResult>(`/api/recommend/all/${foodId}`)
	return response.data
}
