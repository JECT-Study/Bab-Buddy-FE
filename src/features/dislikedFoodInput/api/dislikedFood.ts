import { api } from '@/shared/api/client'
import type { DislikedFood } from '../types/dislikedFoodTypes'

export const getDislikedFoods = async () => {
	const response = await api.get<DislikedFood[]>('/api/food')

	return response.data
}

export const addDislikedFood = async (foodName: string) => {
	const response = await api.post<unknown>('/api/food', {
		foodName,
	})

	return response.data
}

export const deleteDislikedFood = async (foodId: string) => {
	const response = await api.delete<unknown>(`/api/food/${foodId}`)

	return response.data
}
