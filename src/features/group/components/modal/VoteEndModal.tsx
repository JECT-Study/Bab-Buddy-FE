'use client'
import Modal from './Modal'

interface VoteEndModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	subtitle: string
	callbackOnFinishVote: () => void
}

export default function VoteEndModal({
	isOpen,
	onClose,
	title,
	subtitle,
	callbackOnFinishVote,
}: VoteEndModalProps) {
	if (!isOpen) return null

	return (
		<Modal onClose={onClose}>
			<div className="flex w-[527px] flex-col items-center rounded-[50px] bg-white px-16 py-12">
				<h2 className="text-h3-bold mb-2 text-center">{title}</h2>
				<p className="text-b2-medium text-gray-30 mb-8 text-center">{subtitle}</p>
				<div className="flex w-full flex-col gap-4">
					<button
						onClick={callbackOnFinishVote}
						className="bg-orange flex w-full items-center justify-center rounded-[50px] px-8 py-4 text-white"
					>
						<span className="text-b2-medium leading-6 tracking-[-0.02em]">
							투표 종료하고 결과 확인하기
						</span>
					</button>
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
