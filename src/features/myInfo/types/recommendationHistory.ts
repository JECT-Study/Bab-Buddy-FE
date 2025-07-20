export interface Restaurant {
	id: number
	name: string
	restaurantType: string
	address: string
	rating: string
	latitude: number
	longitude: number
	createdAt: string
}

export interface RecommendationHistory {
	foodName: string
	createAt: string
	restaurantList: Restaurant[]
}

export type RecommendationHistoryResponse = RecommendationHistory[]
