import { api } from '@/shared/api/client'
import { User } from '../types/user'

export const getUserInfo = async (): Promise<User> => {
	const response = await api.get<User>('/api/user')
	return response.data
}
