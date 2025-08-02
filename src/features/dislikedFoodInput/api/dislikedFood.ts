import { api } from '@/shared/api/client'

export const getDislikedFoods = async () => {
	const response = await api.get('/api/food')

	return response
}

export const addDislikedFood = async (foodName: string) => {
	const response = await api.post('/api/food', {
		foodName,
	})

	return response
}

export const deleteDislikedFood = async (foodId: string) => {
	const response = await api.delete(`/api/food/${foodId}`)

	return response
}
