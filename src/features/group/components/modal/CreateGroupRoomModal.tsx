'use client'
import Modal from './Modal'
import { KeyboardEventHandler, useState } from 'react'

interface Props {
	onClose: () => void
	onSubmit: (roomName: string) => void
}

export default function CreateGroupRoomModal({ onClose, onSubmit }: Props) {
	const [inputValue, setInputValue] = useState<string>('')

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		const target = e.target as HTMLInputElement
		setInputValue(target.value)
	}

	return (
		<Modal onClose={onClose}>
			<div className="flex w-[527px] flex-col items-center gap-8 rounded-[50px] bg-white px-16 py-12">
				<h2 className="text-h2-bold text-center">새 그룹 만들기</h2>
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="그룹 이름을 입력해주세요."
					className="text-b1-medium w-full rounded-full border border-gray-300 px-6 py-4 text-black placeholder-gray-400 focus:outline-none"
					onClick={(e) => e.stopPropagation()}
				/>
				<div className="flex w-full flex-col gap-4">
					<button
						className={`text-h3-medium w-full rounded-[24px] px-8 py-4 transition ${inputValue.trim() ? 'bg-[#EA580C] text-[#FFFFFF]' : 'text-gray-20 bg-[#F6F6F6]'}`}
						disabled={!inputValue.trim()}
						onClick={() => onSubmit(inputValue)}
					>
						<span>그룹 만들기</span>
					</button>
					<button
						className={`text-h3-medium w-full rounded-[24px] bg-[#E0E0E0] px-8 py-4 text-black`}
						onClick={onClose}
					>
						취소
					</button>
				</div>
			</div>
		</Modal>
	)
}
