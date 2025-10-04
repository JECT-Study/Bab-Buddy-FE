'use client'

import { ShareModal } from '@/features/share/components/ShareModal'
import ShareButton from '@/shared/components/button/ShareButton'
import { useShareActions } from '@/shared/hooks/useShareActions'
import { useModal } from '@/shared/hooks/useModal'
import { getLastKoreanLetter } from '../../utils/groupUtils'
import VoteResultList from './VoteResultList'
import type { VoteResultType } from '../../types/group'

interface VoteResultProps {
	result: VoteResultType
}

export default function VoteResult({ result }: VoteResultProps) {
	const { isOpen, closeModal, openModal } = useModal()
	const { handleKakaoShare, handleLinkShare } = useShareActions(
		`${result.title} 그룹 투표 결과를 확인해보세요!`,
		'오늘의 메뉴는 이렇게 선정됐어요!',
		'https://www.ricebuddy.site/assets/images/home-personal-babbuddy.webp',
		`${window.location.origin}/group/${result.voteRoomId}/result`,
	)

	const lastKoreanLetter = getLastKoreanLetter(result.result.topMenus[0].menus[0].menuName || '')

	return (
		<div className="flex h-full w-full justify-center rounded-3xl bg-white p-6">
			<div className="flex w-[968px] flex-col items-center gap-6 px-8">
				{/* 투표 종료 메시지 */}
				<h3 className="text-h3-bold min-h-[70px] text-center whitespace-pre-line text-gray-100">
					{`투표가 종료되었어요 🎉\n 투표 결과를 팀원들과 공유해보세요!`}
				</h3>
				{/* 투표 결과 */}
				<div className="bg-gray-5 flex w-full flex-1 flex-col gap-6 rounded-3xl px-8 py-6">
					<p className="text-b1-medium w-full text-center text-gray-100">
						<span>가장 많은 득표수를 받은</span>{' '}
						<span className="text-orange">
							{result.result.topMenus[0].menus[0].menuName.substring(0, 21)}
						</span>
						<span>{lastKoreanLetter}</span> <span className="text-orange">1위</span>
						<span>로 선정되었어요!</span>
					</p>
					<VoteResultList result={result.result} />
				</div>
				{/* 결과 공유 버튼 */}
				<ShareButton
					onClick={openModal}
					buttonClassName="w-full text-b2-medium rounded-3xl px-6 py-4"
				/>
			</div>
			<ShareModal
				isOpen={isOpen}
				onClose={closeModal}
				onKakaoShare={handleKakaoShare}
				onLinkShare={handleLinkShare}
			/>
		</div>
	)
}
