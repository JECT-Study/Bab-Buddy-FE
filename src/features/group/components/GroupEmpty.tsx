'use client'

import Icon from '@/shared/components/Icon'
import Image from 'next/image'
import { useModal } from '@/shared/hooks/useModal'

const guideSteps = [
	{
		label: 'STEP 01',
		content: '그룹을 만들고 친구들을 초대하세요',
	},
	{
		label: 'STEP 02',
		content: '먹고 싶은 메뉴나 식당을 제안하고 투표해요',
	},
	{
		label: 'STEP 03',
		content: '투표 결과를 보고 오늘의 메뉴를 정해요',
	},
]

export default function GroupEmpty() {
	const { isOpen, openModal, closeModal } = useModal()

	return (
		<>
			<div className="flex flex-col items-center">
				<Image
					src="/assets/images/groupVote-blank-babbuddy.webp"
					alt="밥버디 캐릭터"
					width={209}
					height={128}
					className="my-12"
				/>
				<div className="flex flex-col items-center gap-2">
					<p className="text-b1-medium">그룹방이 텅 비었어요 새로운 방을 생성해보세요</p>
					<button
						type="button"
						onClick={openModal}
						className="text-caption-medium text-gray-30 flex items-center gap-2"
					>
						<Icon.InfoOutline />
						모두와 함께 메뉴 정하기 가이드
					</button>

					{isOpen && (
						<div className="absolute z-20 mt-17 w-[420px] space-y-4 rounded-3xl bg-white p-6 shadow-[0px_8px_32px_-4px_rgba(35,35,66,0.10)]">
							<div className="flex items-center justify-between">
								<strong className="text-b2-bold">어떻게 모두와 함께 메뉴를 정하나요?</strong>
								<button onClick={closeModal}>
									<Icon.Close />
								</button>
							</div>
							<ul className="text-caption-medium flex flex-col gap-2">
								{guideSteps.map((step) => (
									<li key={step.label} className="flex items-center gap-4">
										<span>{step.label}</span>
										<span>{step.content}</span>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>

			{isOpen && <div onClick={closeModal} className="fixed inset-0 z-10" />}
		</>
	)
}
