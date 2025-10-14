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
		const menuId = await addDislikeMenuOnVoteRoom(roomId, inputValue)
		if (menuId == null) {
			alert('불호 메뉴 등록에 실패했습니다.')
			return
		}

		setDislikedMenus((prev: MenuItemType[]) => [
			...prev,
			{ id: menuId ?? '', name: inputValue, createdBy: user?.userId ?? '' },
		])
	}

	const handleDeleteMenu = useCallback(
		async (menuName: string) => {
			await deleteDislikeMenuOnVoteRoom(roomId, menuName)
			// setDislikedMenus((prev) => prev.filter((_menu) => _menu.id !== menuId))
		},
		[roomId],
	)
	return (
		<>
			<MenuInputForm placeholder="먹기 힘든 메뉴를 작성해주세요." onSubmit={handleSubmit} />

			<ul className="flex max-h-[339px] flex-1 flex-col gap-2 overflow-y-auto">
				{dislikedMenus.map((menu) => (
					<MenuItem
						key={menu.id}
						menu={menu}
						disableEdit={true}
						handleDeleteMenu={handleDeleteMenu}
					/>
				))}
			</ul>
		</>
	)
}
