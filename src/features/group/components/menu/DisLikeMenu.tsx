import { useCallback, useState } from 'react'
import { type MenuItemType } from '../../types/group'
import MenuInputForm from '../input/MenuInputForm'
import MenuItem from './MenuItem'
import { addDislikeMenuOnVoteRoom, deleteDislikeMenuOnVoteRoom } from '../../api/voteRoomApi'
import { useUser } from '@/shared/hooks/useUser'

interface DisLikeMenuProps {
	roomId: string
	dislikeMenuList: MenuItemType[]
}
export default function DisLikeMenu({ roomId, dislikeMenuList }: DisLikeMenuProps) {
	const [dislikedMenus, setDislikedMenus] = useState<MenuItemType[]>(dislikeMenuList || [])
	const { user } = useUser()

	const handleSubmit = async (inputValue: string) => {
		if (inputValue.trim() === '') {
			alert('싫어하는 메뉴를 입력해주세요.')
			return
		}

		if (dislikedMenus.some((menu) => menu.name === inputValue.trim())) {
			alert('이미 등록된 싫어하는 메뉴입니다.')
			return
		}

		const menuId = await addDislikeMenuOnVoteRoom(roomId, inputValue)
		if (menuId == null) {
			alert('싫어하는 메뉴 등록에 실패했습니다.')
			return
		}

		setDislikedMenus((prev: MenuItemType[]) => [
			...prev,
			{ id: menuId ?? '', name: inputValue, createdBy: user?.userId ?? '' },
		])
	}

	const handleDeleteMenu = useCallback(
		async (menuId: string, menuName: string) => {
			const isDeleted = await deleteDislikeMenuOnVoteRoom(roomId, menuName)

			if (isDeleted) {
				setDislikedMenus((prev) => prev.filter((_menu) => _menu.id !== menuId))
			}
		},
		[roomId],
	)

	return (
		<>
			<MenuInputForm placeholder="먹기 힘든 메뉴를 작성해주세요." onSubmit={handleSubmit} />

			<ul className="flex max-h-[339px] flex-1 flex-col gap-2 overflow-y-auto">
				{dislikedMenus.map((menu) => (
					<MenuItem
						key={`${menu.id}-${menu.createdBy}`}
						menu={menu}
						disableEdit={true}
						handleDeleteMenu={handleDeleteMenu}
					/>
				))}
			</ul>
		</>
	)
}
