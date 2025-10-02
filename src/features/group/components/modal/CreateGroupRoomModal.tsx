'use client'
import Modal from './Modal'
import { type KeyboardEventHandler } from 'react'

interface Props {
	groupName: string
	setGroupName: (groupName: string) => void
	onClose: () => void
	onNext: () => void
}

export default function CreateGroupRoomModal({ groupName, setGroupName, onClose, onNext }: Props) {
	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') {
			onNext()
		}
	}

	return (
		<Modal onClose={onClose}>
			<div className="flex w-[527px] flex-col items-center gap-8 rounded-[50px] bg-white px-16 py-12">
				<h2 className="text-h2-bold text-center">새 그룹 만들기</h2>
				<input
					type="text"
					value={groupName}
					onChange={(e) => setGroupName(e.target.value.slice(0, 20))}
					onKeyDown={handleKeyDown}
					placeholder="그룹 이름을 입력해주세요. (최대 20자)"
					className="text-b1-medium w-full rounded-full border border-gray-300 px-6 py-4 text-black placeholder-gray-400 focus:outline-none"
				/>
				<div className="flex w-full flex-col gap-4">
					<button
						className={`text-h3-medium w-full rounded-[24px] px-8 py-4 transition ${groupName.trim() ? 'bg-[#EA580C] text-[#FFFFFF]' : 'text-gray-20 bg-[#F6F6F6]'}`}
						disabled={!groupName.trim()}
						onClick={onNext}
					>
						<span>다음</span>
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
