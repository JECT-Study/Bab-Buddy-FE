import { getServerAccessToken } from '@/shared/utils/api'
import { redirect } from 'next/navigation'
import type { GroupDetailType, MenuItemType } from '../types/group'
import { serverClient } from '@/shared/api/serverClient'
import { api } from '@/shared/api/client'

interface ServerGroupDetailType extends Omit<GroupDetailType, 'isHostUser'> {
	hostUser: boolean
}

// 그룹방 상세 조회
export const getGroupDetail = async (id: string) => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const [groupDetail, groupDislikeFoods] = await Promise.all([
			serverClient.get<ServerGroupDetailType>(`/api/voterooms/${id}`),
			serverClient.get<MenuItemType[]>(`/api/voterooms/dislike/${id}`),
		])

		return {
			...groupDetail.data,
			isHostUser: groupDetail.data.hostUser,
			dislikeMenuList: groupDislikeFoods.data,
		}
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
		const response = await api.post<string>(`/api/menu/create`, { voteRoomId, name })
		if (response.data == null) {
			throw new Error('addMenu error: ', response.data)
		}

		return response.data
	} catch (e) {
		console.error('addMenu error: ', e)
	}
}

// 메뉴 수정
export const updateMenuOnVoteRoom = async (menuId: string, name: string) => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await api.patch(`/api/menu/update/${menuId}`, {
			name,
		})
		return response.data
	} catch (e) {
		console.error('updateMenuOnVoteRoom error: ', e)
	}
}

// 메뉴 삭제
export const deleteMenuOnVoteRoom = async (menuId: string) => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await api.delete(`/api/menu/delete/${menuId}`)
		return response.data
	} catch (e) {
		console.error('deleteMenuOnVoteRoom error: ', e)
	}
}

// 싫어하는 메뉴 등록
export const addDislikeMenuOnVoteRoom = async (roomId: string, name: string) => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await api.post<string>(`/api/voterooms/dislike`, { roomId, name })
		if (response.data == null) {
			throw new Error('addDislikeMenuOnVoteRoom error: ', response.data)
		}

		return response.data
	} catch (e) {
		console.error('addDislikeMenuOnVoteRoom error: ', e)
	}
}

// 싫어하는 메뉴 삭제
export const deleteDislikeMenuOnVoteRoom = async (roomId: string, name: string) => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await api.delete<string>(`/api/voterooms/dislike`, {
			params: { roomId, name },
		})
		if (response.data == null) {
			throw new Error('deleteDislikeMenuOnVoteRoom error: ', response.data)
		}

		return response.data
	} catch (e) {
		console.error('deleteDislikeMenuOnVoteRoom error: ', e)
	}
}

// 메뉴 투표
export const voteMenu = async (voteRoomId: string, menuId: string) => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/vote/register`, {
			voteRoomId,
			menuId,
		})
		return response?.data
	} catch (e) {
		console.error('voteMenu error: ', e)
	}
}

// 그룹방(투표방) 삭제
export const deleteVoteRoom = async (voteRoomId: string) => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await api.patch(`/api/voterooms/delete/${voteRoomId}`)
		return response.data
	} catch (e) {
		console.error('deleteVoteRoom error: ', e)
	}
}
