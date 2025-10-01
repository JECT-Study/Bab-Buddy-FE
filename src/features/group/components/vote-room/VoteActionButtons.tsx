'use client'

import { ShareModal } from '@/features/share/components/ShareModal'
import Icon from '@/shared/components/Icon'
import { useCallback, useState } from 'react'
import VoteEndModal from '../modal/VoteEndModal'
import { copyToClipboard, shareToKakao } from '@/features/share/utils/share'
import { useInitializeKakaoShare } from '@/shared/hooks/useInitializeKakaoShare'

interface VoteActionButtonsProps {
	invitationTitle: string
	invitationDescription: string
	invitationImageUrl: string
	invitationLink: string
}

const useVoteActionButtons = (
	invitationTitle: string,
	invitationDescription: string,
	invitationImageUrl: string,
	invitationLink: string,
) => {
	const [isShareModalOpen, setIsShareModalOpen] = useState(false)
	const [isEndModalOpen, setIsEndModalOpen] = useState(false)

	console.log('TLQKF invitationImageUrl: ', invitationImageUrl)

	// kakao 공유하기를 위한 kakao sdk 초기화
	useInitializeKakaoShare()

	const handleShareModalOpen = useCallback(() => {
		setIsShareModalOpen(true)
	}, [setIsShareModalOpen])

	const handleShareModalClose = useCallback(() => {
		setIsShareModalOpen(false)
	}, [setIsShareModalOpen])

	const handleEndModalOpen = useCallback(() => {
		setIsEndModalOpen(true)
	}, [setIsEndModalOpen])

	const handleEndModalClose = useCallback(() => {
		setIsEndModalOpen(false)
	}, [setIsEndModalOpen])

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
		isEndModalOpen,
		handleShareModalOpen,
		handleShareModalClose,
		handleEndModalOpen,
		handleEndModalClose,
		handleKakaoShare,
		handleLinkShare,
	}
}

export default function VoteActionButtons({
	invitationTitle,
	invitationDescription,
	invitationImageUrl,
	invitationLink,
}: VoteActionButtonsProps) {
	const {
		isShareModalOpen,
		isEndModalOpen,
		handleShareModalOpen,
		handleShareModalClose,
		handleEndModalOpen,
		handleEndModalClose,
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
					className="text-b2-medium flex w-[55.4%] items-center justify-center gap-2 rounded-4xl bg-orange-500 p-4 text-white outline-none"
					onClick={handleShareModalOpen}
				>
					<Icon.Share size={16} />
					<span>링크 공유하기</span>
				</button>
				<button
					className="bg-gray-5 text-b2-medium text-gray-190 w-[41.7%] rounded-4xl px-2 py-4 outline-none"
					onClick={handleEndModalOpen}
				>
					투표 끝내기
				</button>
			</div>
			<ShareModal
				title="링크를 공유해 초대방에 친구를 초대하세요"
				isOpen={isShareModalOpen}
				onClose={handleShareModalClose}
				onKakaoShare={handleKakaoShare}
				onLinkShare={handleLinkShare}
			/>
			<VoteEndModal
				isOpen={isEndModalOpen}
				onClose={handleEndModalClose}
				title="투표를 종료하고 결과를 확인하세요"
				subtitle="(투표가 종료되면 더이상 메뉴 제안 및 투표를 할 수 없습니다.)"
				callbackOnFinishVote={() => {}}
			/>
		</>
	)
}
