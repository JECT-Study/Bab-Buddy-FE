import { serverClient } from '@/shared/api/serverClient'
import { getServerAccessToken } from '@/shared/utils/api'
import { redirect } from 'next/navigation'
import type { GroupType } from '../types/group'
import { api } from '@/shared/api/client'

export const getGroups = async () => {
	// server에서 token 가져오기
	const token = await getServerAccessToken()

	// token이 없으면 로그인 페이지로 리다이렉트
	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await serverClient.get<GroupType[]>(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/voterooms`,
		)
		return response?.data
	} catch (e) {
		console.error('getGroups error[serverClient]: ', e)
	}
}

export const makeGroupRoom = async (title: string, votingMethod: 'vote' | 'random') => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await api.post(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/voterooms/createroom`,
			{ title, status: 'ONGOING', votingMethod },
		)
		return response?.data
	} catch (e) {
		console.error('makeGroupRoom error[serverClient]: ', e)
	}
}
