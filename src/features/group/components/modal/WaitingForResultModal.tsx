'use client'
import Modal from './Modal'

interface WaitingForResultModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function WaitingForResultModal({ isOpen, onClose }: WaitingForResultModalProps) {
	if (!isOpen) return null

	return (
		<Modal onClose={onClose}>
			<div className="flex w-[527px] flex-col items-center rounded-[50px] bg-white px-16 py-12">
				<h2 className="text-h3-bold mb-2 text-center">결과를 기다리는 중입니다</h2>
				<p className="text-b2-medium text-gray-30 mb-8 text-center">
					결과가 나오면 자동으로 페이지가 이동됩니다
				</p>
				<div className="flex w-full flex-col gap-4">
					<button
						onClick={onClose}
						className="bg-gray-10 flex w-full items-center justify-center gap-20 rounded-[50px] px-8 py-4"
					>
						<span className="text-b2-medium leading-6 tracking-[-0.02em]">취소</span>
					</button>
				</div>
			</div>
		</Modal>
	)
}
