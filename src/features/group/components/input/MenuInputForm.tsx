import Icon from '@/shared/components/Icon'
import { useRef, useState, type KeyboardEventHandler } from 'react'
import { type MenuItemType, type VoteMenu } from '../../types/group'

interface MenuInputFormProps {
	placeholder?: string
	setMenus: React.Dispatch<React.SetStateAction<MenuItemType[]>>
	setVoteMenus: React.Dispatch<React.SetStateAction<VoteMenu[]>>
}

export default function MenuInputForm({
	setMenus,
	setVoteMenus,
	placeholder = '제안하고 싶은 메뉴를 작성해주세요.',
}: MenuInputFormProps) {
	const inputRef = useRef<HTMLInputElement>(null)
	const [inputValue, setInputValue] = useState('')

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter' && inputValue.trim() !== '') {
			handleAddMenu()
		}
	}

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

	return (
		<div className="mb-4 flex h-14 items-center space-x-3">
			{/* 메뉴 등록 */}
			<div className="bg-gray-5 relative flex h-full flex-1 items-center justify-between rounded-3xl p-6 pl-12">
				<Icon.Pencil className="absolute top-1/2 left-6 -translate-y-1/2" />
				<input
					type="text"
					className="text-b2-medium w-full border-0 bg-transparent outline-none"
					placeholder={placeholder}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					ref={inputRef}
				/>
			</div>
			<button
				className={`text-b3-medium flex h-full w-32 items-center gap-1 rounded-3xl px-6 py-2 text-white ${inputValue.trim() ? 'bg-gray-100' : 'bg-gray-30'}`}
				onClick={handleAddMenu}
			>
				메뉴 추가하기
			</button>
		</div>
	)
}
