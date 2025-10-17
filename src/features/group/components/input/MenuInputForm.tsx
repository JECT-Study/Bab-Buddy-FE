import Icon from '@/shared/components/Icon'
import { useRef, useState, type KeyboardEventHandler } from 'react'
import AddMenuButton from '../button/AddMenuButton'

interface MenuInputFormProps {
	placeholder?: string
	onSubmit: (inputValue: string) => void | Promise<void>
	needsSubmitButton?: boolean
}

export default function MenuInputForm({
	placeholder = '제안하고 싶은 메뉴를 작성해주세요.',
	onSubmit,
	needsSubmitButton = true,
}: MenuInputFormProps) {
	const inputRef = useRef<HTMLInputElement>(null)
	const [inputValue, setInputValue] = useState('')

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter' && inputValue.trim() !== '') {
			handleAddMenu()
		}
	}

	const handleAddMenu = () => {
		onSubmit(inputValue)
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
			{needsSubmitButton && (
				<AddMenuButton onClick={handleAddMenu} isDisabled={!inputValue.trim()} />
			)}
		</div>
	)
}
