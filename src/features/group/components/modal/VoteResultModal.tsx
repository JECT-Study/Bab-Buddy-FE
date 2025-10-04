import type { VoteResultTopMenuType } from '../../types/group'
import Modal from './Modal'

interface VoteResultModalProps {
	isOpen: boolean
	onClose: () => void
	menu: VoteResultTopMenuType
}

export default function VoteResultModal({ isOpen, onClose, menu }: VoteResultModalProps) {
	if (!isOpen) return null

	return (
		<Modal onClose={onClose}>
			<div className="flex w-[527px] flex-col items-center gap-8 rounded-3xl bg-white px-[65px] py-12">
				<h3 className="text-h3-bold h-full text-center text-gray-100">
					공동 {menu.rank}위 투표 결과
				</h3>
				<ul className="flex w-full flex-col items-center gap-4">
					{menu.menus.map((menu) => (
						<li key={menu.menuName} className="text-b2-medium">
							{menu.menuName}
						</li>
					))}
				</ul>
				<button
					className="text-b2-medium bg-gray-10 w-full rounded-[50px] px-6 py-4 outline-none"
					onClick={onClose}
				>
					나가기
				</button>
			</div>
		</Modal>
	)
}
