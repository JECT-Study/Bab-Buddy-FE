import axios from 'axios'
import { getServerAccessToken } from '../utils/api'

const serverClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

// 서버에서는 토큰을 쿠키나 헤더에서 직접 읽어와야 함
serverClient.interceptors.request.use(async (config) => {
	const token = await getServerAccessToken()

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export { serverClient }
