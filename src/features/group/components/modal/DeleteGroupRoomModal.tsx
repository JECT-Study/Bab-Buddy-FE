import Modal from './Modal'

interface DeleteGroupRoomModalProps {
	isOpen: boolean
	onClose: () => void
	onDelete: () => void
}

export default function DeleteGroupRoomModal({
	isOpen,
	onClose,
	onDelete,
}: DeleteGroupRoomModalProps) {
	if (!isOpen) return null

	return (
		<Modal onClose={onClose}>
			<div className="flex w-[527px] flex-col items-center gap-8 rounded-3xl bg-white px-16 py-12">
				<h2 className="text-h3-bold text-center">그룹방을 정말로 삭제할까요?</h2>
				<div className="flex w-full flex-col gap-4">
					<button
						className="bg-orange text-b2-medium w-full rounded-[50px] px-8 py-4 text-white outline-none"
						onClick={onDelete}
					>
						삭제
					</button>
					<button
						className="bg-gray-10 text-b2-medium w-full rounded-[50px] px-8 py-4 text-gray-100 outline-none"
						onClick={onClose}
					>
						취소
					</button>
				</div>
			</div>
		</Modal>
	)
}
