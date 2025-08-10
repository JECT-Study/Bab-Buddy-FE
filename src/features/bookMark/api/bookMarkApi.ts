import { api } from '@/shared/api/client'

export const postBookMark = async (restaurantId: number) => {
	const response = await api.patch<unknown>('/api/restaurant', {
		restaurantId,
	})
	return response.data
}
