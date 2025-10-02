import { useState } from 'react'
// import { addMenuOnVoteRoom } from '../../api/voteRoomApi'
import { type GroupDetailType, type VoteMenu } from '../../types/group'
import Image from 'next/image'
import MenuItem from './MenuItem'
import MenuInputForm from '../input/MenuInputForm'

type AddMenuProps = {
	room: GroupDetailType
	setVoteMenus: React.Dispatch<React.SetStateAction<VoteMenu[]>>
}

export default function AddMenu({ room, setVoteMenus }: AddMenuProps) {
	const [menus, setMenus] = useState(room.menuList)

	return (
		<>
			<MenuInputForm setMenus={setMenus} setVoteMenus={setVoteMenus} />
			{/* 메뉴 목록 */}
			{menus.length > 0 ? (
				<ul className="flex max-h-[339px] flex-1 flex-col gap-2 overflow-y-auto">
					{menus.map((menu) => (
						<MenuItem key={menu.id} menu={menu} setMenus={setMenus} />
					))}
				</ul>
			) : (
				<div className="text-b2-medium text-gray-30 flex flex-1 flex-col items-center justify-center rounded-3xl">
					<Image
						src="/assets/images/groupVote-blank-babbuddy.webp"
						alt="no_menu"
						width={209}
						height={128}
						className="object-contain"
						priority
					/>
					<p className="text-b2-medium text-gray-30 flex flex-col items-center justify-center gap-2">
						<span className="mb-2 text-gray-100">첫 메뉴를 등록해보세요!</span>
						<span className="text-center whitespace-pre-line">{`좋아하는 음식이나 식당을 입력하면\n 다른 사람들과 투표할 수 있어요.`}</span>
					</p>
				</div>
			)}
		</>
	)
}
