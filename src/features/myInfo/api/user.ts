import { api } from '@/shared/api/client'
import { User } from '../types/user'

export const getUserInfo = async (): Promise<User> => {
	const response = await api.get<User>('/api/user')
	return response.data
}

export const checkOnboardingStatus = async (): Promise<boolean> => {
	try {
		const response = await api.get('/api/user/onboarding-status')
		return response.data
	} catch (error) {
		return false
	}
}

export const completeOnboarding = async (): Promise<void> => {
	try {
		await api.post('/api/user/complete-onboarding')
	} catch (error) {
		throw error
	}
}
