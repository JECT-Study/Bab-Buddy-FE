import { api } from '@/shared/api/client'
import { RecommendationHistoryResponse } from '../types/recommendationHistory'

export const getRecommendationHistory = async (
	category: string = 'ALL',
	order: string = 'LATEST',
	page: number = 0,
	size: number = 6,
): Promise<RecommendationHistoryResponse[]> => {
	const response = await api.get(
		`/api/restaurant/history?category=${category}&order=${order}&page=${page - 1}&size=${size}`,
	)
	return response.data
}
