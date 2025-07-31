export interface SharedFoodResult {
	id: number
	name: string
	foodName: string
	foodIntroduce: string
	foodImageUrl: string
	category: string
	createdAt: string
}

export interface SharedRestaurant {
	id: number
	name: string
	restaurantType: string
	address: string
	rating: string
	latitude: number
	longitude: number
	createdAt: string
}

export interface SharedSurveyResult {
	restaurantRes: SharedRestaurant[]
	foodRes: SharedFoodResult
}