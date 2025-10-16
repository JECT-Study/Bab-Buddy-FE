import { getServerAccessToken } from '@/shared/utils/api'
import { redirect } from 'next/navigation'
import { serverClient } from '@/shared/api/serverClient'

// 투표 결과 조회
export const getVoteResult = async (voteRoomId: string) => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await serverClient.get(`/api/voterooms/result/${voteRoomId}`)
		return response.data
	} catch (error) {
		console.error('getVoteResult error: ', error)
	}
}
