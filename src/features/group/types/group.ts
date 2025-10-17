export interface GroupType {
	roomId: string
	title: string
	voteStatus: 'ONGOING' | 'FINISHED'
	participantCount: number
	isHostUser: boolean
}

// 메뉴 정보
export interface MenuItemType {
	id: string
	name: string
	createdBy: string
}

// 참여자 정보
export interface ParticipantType {
	id: string
	name: string
	image: string
}

// 그룹방 디테일 정보
export interface GroupDetailType {
	roomId: string
	title: string
	// voteStatus: 'ONGOING' | 'FINISHED'
	voteStatus: string
	menuList: MenuItemType[]
	dislikeMenuList: MenuItemType[]
	participantList: ParticipantType[]
	totalParticipants: number
	votedParticipants: number
	isHostUser: boolean
	menuSelectMethod: VotingType
}

export type VotingType = 'VOTE' | 'ROULETTE'

export interface VoteMenu {
	menuId: string
	name: string
}

// 투표 결과 정보
export interface VoteResultType {
	voteRoomId: string
	title: string
	result: VoteResultMenuType
	menuSelectMethod: VotingType
}

// 투표 결과 메뉴 정보
export interface VoteResultMenuType {
	topMenus: VoteResultTopMenuType[]
}

// 투표 결과 상위 메뉴 정보
export interface VoteResultTopMenuType {
	rank: number
	count: number
	menus: VoteResultMenuItemType[]
}

// 투표 결과 메뉴 아이템 정보
export interface VoteResultMenuItemType {
	menuName: string
	voteCount: number
}
