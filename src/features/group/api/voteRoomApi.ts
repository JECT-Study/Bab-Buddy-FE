import { getServerAccessToken } from '@/shared/utils/api'
import { redirect } from 'next/navigation'
import type { GroupDetailType, MenuItemType } from '../types/group'
import { serverClient } from '@/shared/api/serverClient'
import { api } from '@/shared/api/client'

interface ServerGroupDetailType extends Omit<GroupDetailType, 'isHostUser'> {
	hostUser: boolean
}

// 그룹방 참여
export const joinGroup = async (id: string) => {
	try {
		const token = await getServerAccessToken()
		if (token == null) {
			throw new Error('로그인 후 참여해주세요')
		}

		const response = await serverClient.post(`/api/voterooms/join/${id}`)
		console.log('[joinGroup] response', response.status)
		if (response.status == 200) {
			return true
		} else {
			throw new Error(`joinGroup error: ${response.status}`)
		}
	} catch (e) {
		throw new Error(`joinGroup error: ${e}`)
	}
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
		return {
			roomId: '',
			title: '',
			voteStatus: 'ONGOING',
			menuList: [
				{
					id: '',
					name: '',
					createdBy: '',
				},
			],
			dislikeMenuList: [
				{
					id: '',
					name: '',
					createdBy: '',
				},
			],
			participantList: [
				{
					id: '',
					name: '',
					image: '',
				},
			],
			totalParticipants: 0,
			votedParticipants: 0,
			isHostUser: false,
			menuSelectMethod: 'VOTE',
		}
	}
}

export const getGroupDetailOnClient = async (id: string): Promise<GroupDetailType> => {
	try {
		const [groupDetail, groupDislikeFoods] = await Promise.all([
			api.get<ServerGroupDetailType>(`/api/voterooms/${id}`),
			api.get<MenuItemType[]>(`/api/voterooms/dislike/${id}`),
		])

		return {
			...groupDetail.data,
			isHostUser: groupDetail.data.hostUser,
			dislikeMenuList: groupDislikeFoods.data,
		}
	} catch (e) {
		console.error('getGroupDetail error[api]: ', e)
		return {
			roomId: '',
			title: '',
			voteStatus: 'ONGOING',
			menuList: [
				{
					id: '',
					name: '',
					createdBy: '',
				},
			],
			dislikeMenuList: [
				{
					id: '',
					name: '',
					createdBy: '',
				},
			],
			participantList: [
				{
					id: '',
					name: '',
					image: '',
				},
			],
			totalParticipants: 0,
			votedParticipants: 0,
			isHostUser: false,
			menuSelectMethod: 'VOTE',
		}
	}
}

// 메뉴 등록
export const addMenuOnVoteRoom = async (voteRoomId: string, name: string) => {
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
	try {
		const response = await api.delete(`/api/menu/delete/${menuId}`)
		return response.data
	} catch (e) {
		console.error('deleteMenuOnVoteRoom error: ', e)
	}
}

// 싫어하는 메뉴 등록
export const addDislikeMenuOnVoteRoom = async (roomId: string, name: string) => {
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
	try {
		const response = await api.delete<string>(`/api/voterooms/dislike`, {
			data: { roomId, name },
		})

		if (response.data == null) {
			throw new Error('deleteDislikeMenuOnVoteRoom error: ', response.data)
		}

		return true
	} catch (e) {
		console.error('deleteDislikeMenuOnVoteRoom error: ', e)
		return false
	}
}

// 메뉴 투표
export const voteMenu = async (voteRoomId: string, menuId: string) => {
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
	try {
		const response = await api.patch(`/api/voterooms/delete/${voteRoomId}`)
		return response.data
	} catch (e) {
		console.error('deleteVoteRoom error: ', e)
	}
}

// 룰렛 결과 저장
export const saveRouletteResult = async (menuName: string) => {
	console.log('menuName: ', menuName)
	try {
		// const response = await api.post(`/api/voterooms/roulette/result`, {
		// 	menuName,
		// })
		// return response.data

		await new Promise((resolve) => setTimeout(resolve, 3000))
		return 200
	} catch (e) {
		console.error('saveRouletteResult error: ', e)
		return 500
	}
}

// 투표 끝내기
export const terminateVoteRoom = async (voteRoomId: string) => {
	try {
		const response = await api.patch(`/api/voterooms/close/${voteRoomId}`)
		return response.data
	} catch (e) {
		console.error('terminateVoteRoom error: ', e)
	}
}
