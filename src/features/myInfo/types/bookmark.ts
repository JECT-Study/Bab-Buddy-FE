import type { Restaurant } from './recommendationHistory'
export interface BookmarkResponse {
	content: Restaurant[]
	totalPages: number
}
