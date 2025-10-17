'use client'
import { useCallback, useState } from 'react'
import VoteEndModal from '../modal/VoteEndModal'
import { useRouter } from 'next/navigation'
import { type GroupDetailType } from '../../types/group'
import { terminateVoteRoom } from '../../api/voteRoomApi'

interface VoteRoomStepperProps {
	room: GroupDetailType
	activeStep: number
	setActiveStep: (step: number) => void
	setIsRouletteFinished: (isFinished: boolean) => void
}

const NO_ROULETTE_STEP = 2
const ASIDE_MENUS = [
	{
		label: '메뉴 제안하기',
		value: 'menu',
	},
	{
		label: '싫은 메뉴 추가',
		value: 'dislike',
	},
	{
		label: '투표하기',
		value: 'vote',
	},
]

export default function VoteRoomStepper({
	room: { roomId, title, isHostUser, votedParticipants, voteStatus, menuSelectMethod },
	activeStep,
	setActiveStep,
	setIsRouletteFinished,
}: VoteRoomStepperProps) {
	const router = useRouter()
	const [isEndModalOpen, setIsEndModalOpen] = useState(false)

	const isRoulette = menuSelectMethod === 'ROULETTE'

	const handleEndModalOpen = useCallback(() => {
		setIsEndModalOpen(true)
	}, [setIsEndModalOpen])

	const handleEndModalClose = useCallback(() => {
		setIsEndModalOpen(false)
	}, [setIsEndModalOpen])

	const handleFinishVote = useCallback(async () => {
		setIsEndModalOpen(false)
		await terminateVoteRoom(roomId)
		router.push(`/group/${roomId}/result`)
	}, [setIsEndModalOpen, router, roomId])

	const handleFinishRoulette = useCallback(async () => {
		setIsEndModalOpen(false)
		setIsRouletteFinished(true)
		await terminateVoteRoom(roomId)
	}, [setIsEndModalOpen, setIsRouletteFinished, roomId])

	const isDisabled =
		(isHostUser && votedParticipants === 0) || (!isHostUser && voteStatus === 'ONGOING')

	const routeToResult = useCallback(() => {
		router.push(`/group/${roomId}/result`)
	}, [router, roomId])

	return (
		<>
			<div className="w-full flex-1">
				<div className="w-full">
					<h1 className="text-b1-bold text-gray-100">{title}</h1>
				</div>
				<div className="border-gray-10 mt-[35px] mb-6 w-full border-[1px]"></div>
				<ul className="flex w-full flex-col gap-6">
					{ASIDE_MENUS.map((menu, idx) => {
						// 룰렛 경우 1번째 스텝까지만 보여줌
						if (isRoulette && idx + 1 >= NO_ROULETTE_STEP) {
							return null
						}
						return (
							<li key={menu.value} className="text-b2-bold w-full">
								<button
									className={`${activeStep === idx + 1 ? 'bg-gray-5' : ''} flex w-full items-center rounded-[18px] p-4 outline-none`}
									onClick={() => setActiveStep(idx + 1)}
								>
									<span className="mr-2 flex items-center">{idx + 1}.</span>
									<span className="">{menu.label}</span>
								</button>
							</li>
						)
					})}
				</ul>
			</div>
			<button
				className={`text-b2-medium w-full rounded-3xl px-6 py-4 outline-none ${isDisabled ? 'bg-gray-5 text-gray-10' : 'bg-orange-500 text-white'}`}
				onClick={isHostUser ? handleEndModalOpen : routeToResult}
				disabled={isDisabled}
			>
				{isHostUser ? (isRoulette ? '결과 확인하기' : '투표 끝내기') : '투표 결과보기'}
			</button>
			<VoteEndModal
				voteMethod={menuSelectMethod}
				isOpen={isEndModalOpen}
				onClose={handleEndModalClose}
				callbackOnFinishVote={isRoulette ? handleFinishRoulette : handleFinishVote}
			/>
		</>
	)
}
