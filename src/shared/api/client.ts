import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { AuthStorage } from '../utils/auth'

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

// API 메서드들 - T는 실제 응답 데이터 타입을 의미
export const api = {
	// GET 요청
	get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
		return apiClient.get<T>(url, config)
	},
	// POST 요청
	post: <T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<AxiosResponse<T>> => {
		return apiClient.post<T>(url, data, config)
	},
	// DELETE 요청
	delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
		return apiClient.delete<T>(url, config)
	},
	patch: <T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<AxiosResponse<T>> => {
		return apiClient.patch<T>(url, data, config)
	},
}

export default apiClient
