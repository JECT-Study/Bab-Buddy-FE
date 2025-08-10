import { api } from '@/shared/api/client'
import type { AllergyInfo, AllergyRequest, AllergyResponse } from '../types/allergyTypes'

// 알러지 정보 조회
const getAllergies = async (): Promise<AllergyInfo[]> => {
	const response = await api.get<AllergyInfo[]>('/api/allergy')
	return response.data
}

// 알러지 정보 업데이트
const updateAllergies = async (allergyTypes: string[]): Promise<AllergyResponse> => {
	try {
		const response = await api.post<AllergyResponse>('/api/allergy', {
			allergyTypes,
		} as AllergyRequest)
		return response.data
	} catch (error) {
		console.error('알러지 정보 업데이트 실패:', error)
		throw error
	}
}

export { getAllergies, updateAllergies }
