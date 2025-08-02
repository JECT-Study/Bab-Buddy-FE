import { api } from '@/shared/api/client'
import { RecommendationHistoryResponse } from '../types/recommendationHistory'

export const getRecommendationHistory = async (
	category: string = 'ALL',
	order: string = 'LATEST',
	page: number = 1,
	size: number = 6,
): Promise<RecommendationHistoryResponse[]> => {
	const response = await api.get(
		`/api/restaurant/history?category=${category}&order=${order}&page=${page}&size=${size}`,
	)
	return response.data
}
