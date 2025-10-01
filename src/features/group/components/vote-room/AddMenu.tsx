import Icon from '@/shared/components/Icon'
import { type KeyboardEventHandler, useRef, useState } from 'react'
// import { addMenuOnVoteRoom } from '../../api/voteRoomApi'
import { type GroupDetailType, type MenuItemType, type VoteMenu } from '../../types/group'
import Image from 'next/image'
import MenuItem from '../menu/MenuItem'

type AddMenuProps = {
	room: GroupDetailType
	setVoteMenus: React.Dispatch<React.SetStateAction<VoteMenu[]>>
}

export default function AddMenu({ room, setVoteMenus }: AddMenuProps) {
	const [inputValue, setInputValue] = useState('')
	const [menus, setMenus] = useState(room.menuList)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleAddMenu = async () => {
		// const menuId = await addMenuOnVoteRoom(room.roomId, inputValue)
		// if (menuId == null) {
		// 	return
		// }

		const menuId = Math.random().toString(36).substring(2, 15)

		setMenus((prev: MenuItemType[]) => [
			...prev,
			{ id: menuId, name: inputValue, createdBy: 'babbuddy' },
		])
		setVoteMenus((prev: VoteMenu[]) => [...prev, { menuId, name: inputValue }])
		setInputValue('')
		inputRef.current?.focus()
	}

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') {
			handleAddMenu()
		}
	}

	return (
		<>
			{/* 메뉴 등록 */}
			<div className="bg-gray-5 mb-16 flex h-[72px] w-full items-center justify-between rounded-3xl p-6">
				<input
					type="text"
					className="text-b2-medium w-[calc(100%-140px)] border-0 bg-transparent outline-none"
					placeholder="먹고싶은 음식 메뉴 또는 가고싶은 식당을 적어주세요."
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					ref={inputRef}
				/>
				<button
					className={`text-b3-medium w-fit-content flex !h-10 items-center gap-1 rounded-3xl px-4 py-2 text-[#FFF] ${inputValue.trim() ? 'bg-gray-100' : 'bg-gray-30'}`}
					onClick={handleAddMenu}
				>
					<Icon.Plus />
					<span>메뉴 추가하기</span>
				</button>
			</div>
			{/* 메뉴 목록 */}
			<div>
				{menus.length > 0 ? (
					menus.map((menu) => <MenuItem key={menu.id} menu={menu} setMenus={setMenus} />)
				) : (
					<div className="text-b2-medium text-gray-30 flex flex-col items-center justify-center rounded-3xl">
						<Image
							src="/assets/images/groupVote-blank-babbuddy.webp"
							alt="no_menu"
							width={209}
							height={128}
							className="object-contain"
							priority
						/>
						<p className="text-b2-medium text-gray-30 flex flex-col items-center justify-center gap-2">
							<span className="color-[--color-gray-0] mb-2">첫 메뉴를 등록해보세요!</span>
							<span className="text-center whitespace-pre-line">{`좋아하는 음식이나 식당을 입력하면\n 다른 사람들과 투표할 수 있어요.`}</span>
						</p>
					</div>
				)}
			</div>
		</>
	)
}
