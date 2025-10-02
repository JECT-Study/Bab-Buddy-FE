export interface GroupType {
	roomId: string
	title: string
	voteStatus: 'ONGOING' | 'FINISHED'
	participantCount: number
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
	imageUrl: string
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
}

export interface VoteMenu {
	menuId: string
	name: string
}
