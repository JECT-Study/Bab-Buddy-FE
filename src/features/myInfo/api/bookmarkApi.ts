import { api } from '@/shared/api/client'

export const getBookmark = async (
	category: string = 'ALL',
	order: string = 'LATEST',
	page: number = 1,
	size: number = 6,
) => {
	const response = await api.get(
		`/api/restaurant/bookmarks?category=${category}&order=${order}&page=${page}&size=${size}`,
	)
	return response.data
}
