import { AuthStorage } from '../utils/auth'
import { api } from './client'

// OAuth 로그인 링크 요청
export const getOAuthLoginUrl = async (): Promise<string> => {
	try {
		const response = await api.get<string>('/api/oauth2/login', {
			responseType: 'text',
		})
		console.log(response.data, 'response.data', response)
		return response.data
	} catch (error) {
		console.error('OAuth URL 요청 실패:', error)
		throw error
	}
}

// 로그아웃
export const logout = async () => {
	try {
		const response = await api.post<unknown>('/api/oauth2/logout')
		AuthStorage.clearTokens()
		window.location.href = '/login'
		return response.data
	} catch (error) {
		console.error('로그아웃 실패 ❌', error)
		throw error
	}
}
