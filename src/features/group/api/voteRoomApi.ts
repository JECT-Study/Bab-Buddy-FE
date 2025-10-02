import { api } from '@/shared/api/client'
import { getServerAccessToken } from '@/shared/utils/api'
import { redirect } from 'next/navigation'
import type { GroupDetailType } from '../types/group'

// 그룹방 상세 조회
export const getGroupDetail = async (id: string) => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await api.get<GroupDetailType>(`/api/voterooms/${id}`)
		return response.data
	} catch (e) {
		console.error('getGroupDetail error[serverClient]: ', e)
	}
}

// 메뉴 등록
export const addMenuOnVoteRoom = async (voteRoomId: string, name: string) => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await api.post<string>(`/api/voterooms/addmenu`, { voteRoomId, name })
		if (response.data == null) {
			throw new Error('addMenu error: ', response.data)
		}

		return response.data
	} catch (e) {
		console.error('addMenu error[serverClient]: ', e)
	}
}

// 메뉴 수정
export const updateMenuOnVoteRoom = async (menuId: string, name: string) => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await api.patch(`/api/room/menu/update/${menuId}`, {
			name,
		})
		return response.data
	} catch (e) {
		console.error('updateMenuOnVoteRoom error[serverClient]: ', e)
	}
}

// 메뉴 삭제
export const deleteMenuOnVoteRoom = async (menuId: string) => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await api.delete(`/api/room/menu/delete/${menuId}`)
		return response.data
	} catch (e) {
		console.error('deleteMenuOnVoteRoom error[serverClient]: ', e)
	}
}

// 메뉴 투표
export const voteMenu = async (voteRoomId: string, menuId: string) => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await api.post(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/vote/register?voteRoomId=${voteRoomId}&menuId=${menuId}`,
		)
		return response?.data
	} catch (e) {
		console.error('makeGroupRoom error[serverClient]: ', e)
	}
}

// 그룹방(투표방) 삭제
export const deleteVoteRoom = async (voteRoomId: string) => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await api.delete(`/api/voterooms/delete/${voteRoomId}`)
		return response.data
	} catch (e) {
		console.error('deleteVoteRoom error[serverClient]: ', e)
	}
}
