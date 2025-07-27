import { api } from '@/shared/api/client'
import { AllergyRequest, AllergyResponse } from '../types/allergyTypes'

export const allergyApi = {
	// 알러지 정보 업데이트
	updateAllergies: async (allergyTypes: string[]): Promise<AllergyResponse> => {
		try {
			const response = await api.post<AllergyResponse>('/api/allergy', {
				allergyTypes,
			} as AllergyRequest)
			return response.data
		} catch (error) {
			console.error('알러지 정보 업데이트 실패:', error)
			throw error
		}
	},
}
