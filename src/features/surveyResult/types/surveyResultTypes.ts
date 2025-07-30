export interface SurveyResultInfo {
	id: number
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
