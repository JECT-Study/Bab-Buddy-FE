export interface SurveyResultInfo {
	id: number
	name: string
	foodName: string
	foodIntroduce: string
	foodImageUrl: string
	category: string
	createdAt: string
}

export interface SurveyResponse {
	survey1: string | null
	survey2: string | null
	survey3: string | null
	address: string | null
}

export interface FoodResponse {
	foodName: string
}
