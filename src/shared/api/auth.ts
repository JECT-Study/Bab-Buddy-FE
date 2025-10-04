import { AuthStorage } from '../utils/auth'
import { api } from './client'

// OAuth 로그인 링크 요청
export const getOAuthLoginUrl = async (): Promise<string> => {
	try {
		const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/oauth2/login?origin=${encodeURIComponent(window.location.origin)}`
		return url
	} catch (error) {
		console.error('OAuth URL 생성 실패:', error)
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
