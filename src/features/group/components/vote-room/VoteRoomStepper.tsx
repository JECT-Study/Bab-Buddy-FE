'use client'
import { useCallback, useState } from 'react'
import VoteEndModal from '../modal/VoteEndModal'
import { useRouter } from 'next/navigation'
import { type GroupDetailType } from '../../types/group'

interface VoteRoomStepperProps {
	room: GroupDetailType
	activeStep: number
	setActiveStep: (step: number) => void
}

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
	room: { roomId, title, isHostUser, votedParticipants },
	activeStep,
	setActiveStep,
}: VoteRoomStepperProps) {
	const router = useRouter()
	const [isEndModalOpen, setIsEndModalOpen] = useState(false)

	const handleEndModalOpen = useCallback(() => {
		setIsEndModalOpen(true)
	}, [setIsEndModalOpen])

	const handleEndModalClose = useCallback(() => {
		setIsEndModalOpen(false)
	}, [setIsEndModalOpen])

	const handleFinishVote = useCallback(() => {
		setIsEndModalOpen(false)
		router.push(`/group/${roomId}/result`)
	}, [setIsEndModalOpen, router, roomId])

	return (
		<>
			<div className="w-full flex-1">
				<div className="w-full">
					<h1 className="text-b1-bold text-gray-100">{title}</h1>
				</div>
				<div className="border-gray-10 mt-[35px] mb-6 w-full border-[1px]"></div>
				<ul className="flex w-full flex-col gap-6">
					{ASIDE_MENUS.map((menu, idx) => (
						<li key={menu.value} className="text-b2-bold w-full">
							<button
								className={`${activeStep === idx + 1 ? 'bg-gray-5' : ''} flex w-full items-center rounded-[18px] p-4 outline-none`}
								onClick={() => setActiveStep(idx + 1)}
							>
								<span className="mr-2 flex items-center">{idx + 1}.</span>
								<span className="">{menu.label}</span>
							</button>
						</li>
					))}
				</ul>
			</div>
			{isHostUser && (
				<button
					className={`text-b2-medium w-full rounded-3xl px-6 py-4 outline-none ${votedParticipants === 0 ? 'bg-gray-5 text-gray-10' : 'bg-orange-500 text-white'}`}
					onClick={handleEndModalOpen}
					disabled={votedParticipants === 0}
				>
					투표 결과보기
				</button>
			)}
			<VoteEndModal
				isOpen={isEndModalOpen}
				onClose={handleEndModalClose}
				title="투표를 종료하고 결과를 확인하세요"
				subtitle="(투표가 종료되면 더이상 메뉴 제안 및 투표를 할 수 없습니다.)"
				callbackOnFinishVote={handleFinishVote}
			/>
		</>
	)
}
