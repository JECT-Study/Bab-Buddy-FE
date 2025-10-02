import { useState } from 'react'
import { type MenuItemType, type VoteMenu, type GroupDetailType } from '../../types/group'
import MenuInputForm from '../input/MenuInputForm'
import MenuItem from './MenuItem'

interface DisLikeMenuProps {
	room: GroupDetailType
	setVoteMenus: React.Dispatch<React.SetStateAction<VoteMenu[]>>
}
export default function DisLikeMenu({ room, setVoteMenus }: DisLikeMenuProps) {
	const [dislikedMenus, setDislikedMenus] = useState<MenuItemType[]>(room.dislikeMenuList || [])
	return (
		<>
			<MenuInputForm
				setMenus={setDislikedMenus}
				setVoteMenus={setVoteMenus}
				placeholder="먹기 힘든 메뉴를 작성해주세요."
			/>

			<ul className="flex max-h-[339px] flex-1 flex-col gap-2 overflow-y-auto">
				{dislikedMenus.map((menu) => (
					<MenuItem key={menu.id} menu={menu} setMenus={setDislikedMenus} disableEdit={true} />
				))}
			</ul>
		</>
	)
}
