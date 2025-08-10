import { api } from '@/shared/api/client'
import { BookmarkResponse } from '../types/bookmark'

export const getBookmark = async (
	category: string = 'ALL',
	order: string = 'LATEST',
	page: number = 0,
	size: number = 12,
): Promise<BookmarkResponse[]> => {
	const response = await api.get(
		`/api/restaurant/bookmarks?category=${category}&order=${order}&page=${page - 1}&size=${size}`,
	)
	return response.data
}
