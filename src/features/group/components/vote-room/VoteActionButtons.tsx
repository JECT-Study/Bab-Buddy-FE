'use client'

import { ShareModal } from '@/features/share/components/ShareModal'
import Icon from '@/shared/components/Icon'
import { useCallback, useState } from 'react'
import DeleteGroupRoomModal from '../modal/DeleteGroupRoomModal'
import { deleteVoteRoom } from '../../api/voteRoomApi'
import { useRouter } from 'next/navigation'
import { useShareActions } from '@/shared/hooks/useShareActions'
import { useModal } from '@/shared/hooks/useModal'

interface VoteActionButtonsProps {
	invitationTitle: string
	invitationDescription: string
	invitationImageUrl: string
	invitationLink: string
	isDeleteButtonShowable: boolean
	roomId: string
}

export default function VoteActionButtons({
	invitationTitle,
	invitationDescription,
	invitationImageUrl,
	invitationLink,
	isDeleteButtonShowable,
	roomId,
}: VoteActionButtonsProps) {
	
	const router = useRouter()
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	const { isOpen, closeModal, openModal } = useModal()
	const { handleKakaoShare, handleLinkShare } = useShareActions(
		invitationTitle,
		invitationDescription,
		invitationImageUrl,
		invitationLink,
	)
	const handleDelete = useCallback(async () => {
		await deleteVoteRoom(roomId)
		router.push('/group')
	}, [roomId, router])

	return (
		<>
			{/* 하단 액션 버튼들 */}
			<div className="flex w-full space-x-2">
				<button
					className={`text-b2-medium flex items-center justify-center gap-2 rounded-4xl bg-orange-500 p-4 text-white outline-none ${isDeleteButtonShowable ? 'w-[55.4%]' : 'w-full'}`}
					onClick={openModal}
				>
					<Icon.Share size={16} />
					<span>링크 공유하기</span>
				</button>
				{isDeleteButtonShowable && (
					<button
						className="border-gray-10 text-b2-medium text-gray-190 w-[41.7%] rounded-4xl border-1 bg-white px-2 py-4 outline-none"
						onClick={() => setIsDeleteModalOpen(true)}
					>
						그룹방 삭제
					</button>
				)}
			</div>
			<ShareModal
				title="링크를 공유해 초대방에 친구를 초대하세요"
				isOpen={isOpen}
				onClose={closeModal}
				onKakaoShare={handleKakaoShare}
				onLinkShare={handleLinkShare}
			/>
			<DeleteGroupRoomModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onDelete={handleDelete}
			/>
		</>
	)
}
