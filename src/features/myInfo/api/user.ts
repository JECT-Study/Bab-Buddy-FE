import { api } from '@/shared/api/client'
import type { User } from '../types/user'

export const getUserInfo = async (): Promise<User> => {
	const response = await api.get<User>('/api/user')
	return response.data
}

export const checkOnboardingStatus = async (): Promise<boolean> => {
	try {
		const response = await api.get<boolean>('/api/user/onboarding-status')
		return response.data
	} catch {
		return false
	}
}

export const completeOnboarding = async (): Promise<void> => {
	try {
		await api.post<unknown>('/api/user/complete-onboarding')
	} catch (error) {
		throw error
	}
}
