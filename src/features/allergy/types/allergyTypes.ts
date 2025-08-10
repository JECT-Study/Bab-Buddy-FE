export interface AllergyRequest {
	allergyTypes: string[]
}

export interface AllergyResponse {
	success: boolean
	message?: string
}

export interface AllergyInfo {
	allergyType: string
	koreanName: string
}
