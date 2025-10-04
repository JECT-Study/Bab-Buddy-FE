'use client'

import { ShareModal } from '@/features/share/components/ShareModal'
import ShareButton from '@/shared/components/button/ShareButton'
import { useShareActions } from '@/shared/hooks/useShareActions'
import { useModal } from '@/shared/hooks/useModal'

interface VoteActionButtonsProps {
	invitationTitle: string
	invitationDescription: string
	invitationImageUrl: string
	invitationLink: string
}

export default function VoteActionButtons({
	invitationTitle,
	invitationDescription,
	invitationImageUrl,
	invitationLink,
}: VoteActionButtonsProps) {
	const { isOpen, closeModal, openModal } = useModal()
	const { handleKakaoShare, handleLinkShare } = useShareActions(
		invitationTitle,
		invitationDescription,
		invitationImageUrl,
		invitationLink,
	)

	return (
		<>
			{/* 하단 액션 버튼들 */}
			<div className="flex w-full space-x-2">
				<ShareButton
					onClick={openModal}
					buttonClassName="w-[55.4%] text-b2-medium rounded-4xl p-4"
				/>
				<button
					className="border-gray-10 text-b2-medium text-gray-190 w-[41.7%] rounded-4xl border-1 bg-white px-2 py-4 outline-none"
					onClick={() => {}}
				>
					그룹방 삭제
				</button>
			</div>
			<ShareModal
				title="링크를 공유해 초대방에 친구를 초대하세요"
				isOpen={isOpen}
				onClose={closeModal}
				onKakaoShare={handleKakaoShare}
				onLinkShare={handleLinkShare}
			/>
		</>
	)
}
