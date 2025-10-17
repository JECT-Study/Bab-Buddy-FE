import { useCallback, useState } from 'react'
import type { VotingType, MenuItemType } from '../../types/group'
import MenuInputForm from '../input/MenuInputForm'
import MenuItem from './MenuItem'
import { addDislikeMenuOnVoteRoom, deleteDislikeMenuOnVoteRoom } from '../../api/voteRoomApi'
import { useUser } from '@/shared/hooks/useUser'
import { useQueryClient } from '@tanstack/react-query'

interface DisLikeMenuProps {
	roomId: string
	dislikeMenuList: MenuItemType[]
	menuSelectMethod: VotingType
}
export default function DisLikeMenu({
	roomId,
	dislikeMenuList,
	menuSelectMethod,
}: DisLikeMenuProps) {
	const [dislikedMenus, setDislikedMenus] = useState<MenuItemType[]>(dislikeMenuList || [])
	const { user } = useUser()
	const queryClient = useQueryClient()

	const handleSubmit = async (inputValue: string) => {
		if (inputValue.trim() === '') {
			alert('싫어하는 메뉴를 입력해주세요.')
			return
		}

		if (dislikedMenus.some((menu) => menu.name === inputValue.trim())) {
			alert('이미 등록된 싫어하는 메뉴입니다.')
			return
		}

		const isAdded = await addDislikeMenuOnVoteRoom(roomId, inputValue)
		if (!isAdded) {
			alert('싫어하는 메뉴 등록에 실패했습니다.')
			return
		}

		setDislikedMenus((prev: MenuItemType[]) => [
			...prev,
			{ menuId: inputValue.trim(), name: inputValue, createdBy: user?.userId ?? '' },
		])
		queryClient.invalidateQueries({ queryKey: ['group', menuSelectMethod, roomId] })
	}

	const handleDeleteMenu = useCallback(
		async (menuId: string, menuName: string) => {
			const isDeleted = await deleteDislikeMenuOnVoteRoom(roomId, menuName)
			if (isDeleted) {
				setDislikedMenus((prev) => prev.filter((_menu) => _menu.menuId !== menuId))
				queryClient.invalidateQueries({ queryKey: ['group', menuSelectMethod, roomId] })
			}
		},
		[roomId, menuSelectMethod, queryClient],
	)
	return (
		<>
			<MenuInputForm placeholder="먹기 힘든 메뉴를 작성해주세요." onSubmit={handleSubmit} />

			<ul className="flex max-h-[339px] flex-1 flex-col gap-2 overflow-y-auto">
				{dislikedMenus.map((menu) => (
					<MenuItem
						key={menu.menuId}
						menu={menu}
						disableEdit={true}
						handleDeleteMenu={handleDeleteMenu}
					/>
				))}
			</ul>
		</>
	)
}
