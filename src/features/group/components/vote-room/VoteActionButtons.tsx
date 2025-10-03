'use client'

import { ShareModal } from '@/features/share/components/ShareModal'
import Icon from '@/shared/components/Icon'
import { useCallback, useState } from 'react'
import { copyToClipboard, shareToKakao } from '@/features/share/utils/share'
import { useInitializeKakaoShare } from '@/shared/hooks/useInitializeKakaoShare'

interface VoteActionButtonsProps {
	invitationTitle: string
	invitationDescription: string
	invitationImageUrl: string
	invitationLink: string
	isDeleteButtonShowable: boolean
}

const useVoteActionButtons = (
	invitationTitle: string,
	invitationDescription: string,
	invitationImageUrl: string,
	invitationLink: string,
) => {
	const [isShareModalOpen, setIsShareModalOpen] = useState(false)

	// kakao 공유하기를 위한 kakao sdk 초기화
	useInitializeKakaoShare()

	const handleShareModalOpen = useCallback(() => {
		setIsShareModalOpen(true)
	}, [setIsShareModalOpen])

	const handleShareModalClose = useCallback(() => {
		setIsShareModalOpen(false)
	}, [setIsShareModalOpen])

	const handleKakaoShare = useCallback(() => {
		shareToKakao({
			title: invitationTitle,
			description: invitationDescription,
			imageUrl: invitationImageUrl,
			link: invitationLink,
		})
	}, [invitationTitle, invitationDescription, invitationImageUrl, invitationLink])

	const handleLinkShare = useCallback(async () => {
		const success = await copyToClipboard(invitationLink)
		if (success) {
			alert('링크가 복사되었습니다.')
		} else {
			alert('링크 복사에 실패했습니다.')
		}
	}, [invitationLink])

	return {
		isShareModalOpen,
		handleShareModalOpen,
		handleShareModalClose,
		handleKakaoShare,
		handleLinkShare,
	}
}

export default function VoteActionButtons({
	invitationTitle,
	invitationDescription,
	invitationImageUrl,
	invitationLink,
	isDeleteButtonShowable,
}: VoteActionButtonsProps) {
	const {
		isShareModalOpen,
		handleShareModalOpen,
		handleShareModalClose,
		handleKakaoShare,
		handleLinkShare,
	} = useVoteActionButtons(
		invitationTitle,
		invitationDescription,
		invitationImageUrl,
		invitationLink,
	)

	return (
		<>
			{/* 하단 액션 버튼들 */}
			<div className="flex w-full space-x-2">
				<button
					className={`text-b2-medium flex items-center justify-center gap-2 rounded-4xl bg-orange-500 p-4 text-white outline-none ${isDeleteButtonShowable ? 'w-[55.4%]' : 'w-full'}`}
					onClick={handleShareModalOpen}
				>
					<Icon.Share size={16} />
					<span>링크 공유하기</span>
				</button>
				{isDeleteButtonShowable && (
					<button
						className="border-gray-10 text-b2-medium text-gray-190 w-[41.7%] rounded-4xl border-1 bg-white px-2 py-4 outline-none"
						onClick={() => {}}
					>
						그룹방 삭제
					</button>
				)}
			</div>
			<ShareModal
				title="링크를 공유해 초대방에 친구를 초대하세요"
				isOpen={isShareModalOpen}
				onClose={handleShareModalClose}
				onKakaoShare={handleKakaoShare}
				onLinkShare={handleLinkShare}
			/>
		</>
	)
}
