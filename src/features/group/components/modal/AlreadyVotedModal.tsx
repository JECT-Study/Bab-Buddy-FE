import Icon from '@/shared/components/Icon'
import type { VoteResultTopMenuType } from '../../types/group'
import Modal from './Modal'

interface AlreadyVotedModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function AlreadyVotedModal({ isOpen, onClose }: AlreadyVotedModalProps) {
	if (!isOpen) return null

	return (
		<Modal onClose={onClose}>
			<div className="flex w-[420px] flex-col gap-4 rounded-3xl bg-white p-6 shadow-[0px_8px_32px_-4px_rgba(35,35,66,0.10)]">
				<div className="flex w-full items-center justify-between">
					<h3 className="text-b2-bold text-gray-100">이미 다른 메뉴에 투표했어요!</h3>
					<button onClick={onClose}>
						<Icon.Close />
					</button>
				</div>
				<p className="flex flex-col gap-2">
					<span className="caption-medium text-gray-100">
						투표한 메뉴를 바꾸려면 먼저 기존 투표를 취소해주세요.
					</span>
					<span className="caption-medium text-gray-30">
						먼저 기존 투표를 눌러 취소한 뒤 시도해주세요.
					</span>
				</p>
			</div>
		</Modal>
	)
}
