import { getServerAccessToken } from '@/shared/utils/api'
import { redirect } from 'next/navigation'
import { api } from '@/shared/api/client'

// 투표 결과 조회
export const getVoteResult = async (voteRoomId: string) => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await api.get(`/api/voterooms/result/${voteRoomId}`)
		return response.data
	} catch (error) {
		console.error('getVoteResult error: ', error)
	}
}
