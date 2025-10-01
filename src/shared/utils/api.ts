'use server'
import { cookies } from 'next/headers'

export const getServerAccessToken = async () => {
	const cookieStore = await cookies()
	const token = cookieStore.get('accessToken')?.value
	return token
}
