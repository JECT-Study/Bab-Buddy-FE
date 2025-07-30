import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { AuthStorage } from '../utils/auth'
import { useState } from 'react'

// API Base URL - Next.js API Routes를 통해 프록시 처리
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000, // 10초 타임아웃
	headers: {
		'Content-Type': 'application/json',
	},
})

// Request 인터셉터 - 요청 전에 토큰 추가
apiClient.interceptors.request.use(
	(config) => {
		if (typeof window !== 'undefined') {
			const token = AuthStorage.getAccessToken()
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

// Response 인터셉터 - 응답 후 에러 처리
apiClient.interceptors.response.use(
	(response) => {
		return response
	},
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			AuthStorage.clearTokens()
			window.location.href = '/login'
		}
		return Promise.reject(error)
	},
)

// API 메서드들
export const api = {
	// GET 요청
	get: <T = any>(url: string, config?: AxiosRequestConfig) => {
		return apiClient.get<T>(url, config)
	},
	// POST 요청
	post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
		return apiClient.post<T>(url, data, config)
	},

	// DELETE 요청
	delete: <T = any>(url: string, config?: AxiosRequestConfig) => {
		return apiClient.delete<T>(url, config)
	},
}

interface UseApiState<T> {
	data: T | null
	isLoading: boolean
	error: Error | null
}

type ApiFunction<T, P extends any[]> = (...args: P) => Promise<T>

export const useApi = <T, P extends any[]>(apiFunction: ApiFunction<T, P>) => {
	const [state, setState] = useState<UseApiState<T>>({
		data: null,
		isLoading: false,
		error: null,
	})

	const execute = async (...args: P) => {
		try {
			setState((prev) => ({ ...prev, isLoading: true, error: null }))
			const result = await apiFunction(...args)
			setState((prev) => ({ ...prev, data: result, isLoading: false }))
			return result
		} catch (error) {
			setState((prev) => ({
				...prev,
				error: error as Error,
				isLoading: false,
			}))
			throw error
		}
	}

	return {
		...state,
		execute,
	}
}

export default apiClient
