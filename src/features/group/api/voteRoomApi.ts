import { getServerAccessToken } from '@/shared/utils/api'
import { redirect } from 'next/navigation'
import type { GroupDetailType, MenuItemType, VotingType } from '../types/group'
import { serverClient } from '@/shared/api/serverClient'
import { api } from '@/shared/api/client'

interface ServerGroupDetailType extends Omit<GroupDetailType, 'isHostUser'> {
	hostUser: boolean
}

// 그룹방 메뉴 선택 방식 조회
export const getGroupMenuSelectMethod = async (id: string) => {
	const token = await getServerAccessToken()
	if (token == null) {
		return redirect('/login')
	}

	try {
		const response = await serverClient.get<{ menuSelectMethod: VotingType }>(
			`/api/voterooms/menu-select-method/${id}`,
		)
		return response.data
	} catch (e) {
		console.error('getGroupMenuSelectMethod error[serverClient]: ', e)
		return { menuSelectMethod: 'VOTE' }
	}
}

// 그룹방 참여
export const joinGroup = async (id: string) => {
	try {
		const token = await getServerAccessToken()
		if (token == null) {
			throw new Error('로그인 후 참여해주세요')
		}

		const response = await serverClient.post(`/api/voterooms/join/${id}`)
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
					menuId: '',
					name: '',
					createdBy: '',
				},
			],
			dislikeMenuList: [
				{
					menuId: '',
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
			votedMenuName: '',
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
					menuId: '',
					name: '',
					createdBy: '',
				},
			],
			dislikeMenuList: [
				{
					menuId: '',
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
			votedMenuName: '',
		}
	}
}

// 그룹방 룰렛 상세 조회
export const getGroupRouletteDetail = async (id: string): Promise<GroupDetailType> => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const rouletteDetail = await serverClient.get<ServerGroupDetailType>(
			`/api/voterooms/roulette/${id}`,
		)

		return {
			...rouletteDetail.data,
			isHostUser: rouletteDetail.data.hostUser,
		}
	} catch (e) {
		console.error('getGroupRouletteDetail error[serverClient]: ', e)
		return {
			roomId: '',
			title: '',
			voteStatus: 'ONGOING',
			menuList: [],
			dislikeMenuList: [],
			participantList: [],
			totalParticipants: 0,
			votedParticipants: 0,
			isHostUser: false,
			menuSelectMethod: 'VOTE',
			votedMenuName: '',
		}
	}
}

export const getGroupRouletteDetailOnClient = async (id: string): Promise<GroupDetailType> => {
	const token = await getServerAccessToken()

	if (token == null) {
		return redirect('/login')
	}

	try {
		const rouletteDetail = await api.get<ServerGroupDetailType>(`/api/voterooms/roulette/${id}`)

		return {
			...rouletteDetail.data,
			isHostUser: rouletteDetail.data.hostUser,
		}
	} catch (e) {
		console.error('getGroupRouletteDetail error[api]: ', e)
		return {
			roomId: '',
			title: '',
			voteStatus: 'ONGOING',
			menuList: [],
			dislikeMenuList: [],
			participantList: [],
			totalParticipants: 0,
			votedParticipants: 0,
			isHostUser: false,
			menuSelectMethod: 'VOTE',
			votedMenuName: '',
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

// 룰렛 메뉴 등록
export const addMenuOnRoulette = async (voteRoomId: string, name: string) => {
	try {
		const response = await api.post<string>(`/api/voterooms/roulette/${voteRoomId}`, { name })
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
		return response.status == 200
	} catch (e) {
		console.error('deleteMenuOnVoteRoom error: ', e)
		return false
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

// 메뉴 투표 취소
export const cancelVoteMenu = async (voteId: string) => {
	try {
		const response = await api.delete(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/vote/cancel?voteId=${voteId}`,
		)
		return response.status == 200
	} catch (e) {
		console.error('cancelVoteMenu error: ', e)
		return false
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
export const saveRouletteResult = async (menuName: string, roomId: string) => {
	try {
		const response = await api.post(`/api/voterooms/roulette/${roomId}`, {
			menuName,
			menuSelectMethod: 'ROULETTE',
		})
		return response.status == 200
	} catch (e) {
		console.error('saveRouletteResult error: ', e)
		return false
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
