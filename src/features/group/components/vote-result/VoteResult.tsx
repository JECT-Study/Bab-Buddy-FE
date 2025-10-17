'use client'

import { ShareModal } from '@/features/share/components/ShareModal'
import ShareButton from '@/shared/components/button/ShareButton'
import { useShareActions } from '@/shared/hooks/useShareActions'
import { useModal } from '@/shared/hooks/useModal'
import { getLastKoreanLetter } from '../../utils/groupUtils'
import VoteResultList from './VoteResultList'
import type { RouletteResultType, VoteResultType, VotingType } from '../../types/group'
import RouletteResult from './RouletteResult'

interface VoteResultProps {
	result: VoteResultType | RouletteResultType
	menuSelectMethod: VotingType
}

export default function VoteResult({ menuSelectMethod, result }: VoteResultProps) {
	let menuName: string
	if ('selectedMenuName' in result) {
		menuName = result.selectedMenuName
	} else {
		menuName = result.result.topMenus[0].menus[0].menuName
	}

	const KEY = menuSelectMethod === 'ROULETTE' ? 'ROULETTE' : 'VOTE'
	const isVote = KEY === 'VOTE'
	const TEXT_MAP = {
		ROULETTE: {
			title: '랜덤 결과가 나왔어요 🎉\n랜덤 결과를 팀원들과 공유해보세요!',
		},
		VOTE: {
			title: '투표가 종료되었어요 🎉\n 투표 결과를 팀원들과 공유해보세요!',
		},
	}

	const getShareUrl = () => {
		const baseUrl =
			typeof window !== 'undefined' ? window.location.origin : `https://www.ricebuddy.site/`

		return `${baseUrl}/group/${result.voteRoomId}${isVote ? '/result' : ''}`
	}

	const { isOpen, closeModal, openModal } = useModal()
	const { handleKakaoShare, handleLinkShare } = useShareActions(
		`${result.title} 그룹 ${isVote ? '투표' : '룰렛'} 결과를 확인해보세요!`,
		'오늘의 메뉴는 이렇게 선정됐어요!',
		'https://www.ricebuddy.site/assets/images/home-personal-babbuddy.webp',
		getShareUrl(),
	)

	const lastKoreanLetter = getLastKoreanLetter(menuName)

	return (
		<div className="flex h-full w-full justify-center rounded-3xl bg-white p-6">
			<div className="flex w-[968px] flex-col items-center gap-6 px-8">
				{/* 투표 종료 메시지 */}
				<h3 className="text-h3-bold min-h-[70px] text-center whitespace-pre-line text-gray-100">
					{TEXT_MAP[KEY].title}
				</h3>
				{/* 투표 결과 */}
				<div className="bg-gray-5 flex w-full flex-1 flex-col items-center gap-6 rounded-3xl px-8 py-6">
					{isVote && (
						<p className="text-b1-medium w-full text-center text-gray-100">
							<span>가장 많은 득표수를 받은</span>{' '}
							<span className="text-orange">{menuName.substring(0, 21)}</span>
							<span>{lastKoreanLetter}</span> <span className="text-orange">1위</span>
							<span>로 선정되었어요!</span>
						</p>
					)}
					{isVote && (
						<VoteResultList result={(result as VoteResultType).result} menuSelectMethod={KEY} />
					)}
					{!isVote && <RouletteResult menu={(result as RouletteResultType).selectedMenuName} />}
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
