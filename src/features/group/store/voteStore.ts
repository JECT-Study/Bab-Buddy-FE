import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface VotedMenu {
	menuId: string
	menuName: string
	voteId: string
}

interface VoteState {
	// roomId를 키로 하는 투표 정보 저장
	votedMenus: Record<string, VotedMenu>
	// 특정 방에서 투표한 메뉴 저장
	setVotedMenu: (roomId: string, menuId: string, menuName: string, voteId: string) => void
	// 특정 방에서 투표한 메뉴 가져오기
	getVotedMenu: (roomId: string) => VotedMenu | null
	// 특정 방의 투표 취소 (삭제)
	clearVotedMenu: (roomId: string) => void
	// 모든 투표 정보 삭제
	clearAllVotes: () => void
}

export const useVoteStore = create<VoteState>()(
	persist(
		(set, get) => ({
			votedMenus: {},
			setVotedMenu: (roomId: string, menuId: string, menuName: string, voteId: string) =>
				set((state) => ({
					votedMenus: {
						...state.votedMenus,
						[roomId]: { menuId, menuName, voteId },
					},
				})),
			getVotedMenu: (roomId: string) => {
				return get().votedMenus[roomId] ?? null
			},
			clearVotedMenu: (roomId: string) =>
				set((state) => {
					const newVotedMenus = { ...state.votedMenus }
					delete newVotedMenus[roomId]
					return { votedMenus: newVotedMenus }
				}),
			clearAllVotes: () => set({ votedMenus: {} }),
		}),
		{
			name: 'vote-storage', // localStorage에 저장될 키 이름
		},
	),
)
