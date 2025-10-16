'use client'
import Modal from './Modal'
import { useState } from 'react'
import Image from 'next/image'
import type { VotingType } from '../../types/group'

interface Props {
	groupName: string
	onClose: () => void
	onClickPrev: () => void
	onSubmit: (groupName: string, votingMethod: VotingType) => void
}

const VOTING_METHODS = [
	{
		id: 'VOTE' as VotingType,
		title: '투표로 정하기',
		subTitle: '다수결 투표로 메뉴를 정해요',
		image: '/assets/icons/group_vote.svg',
	},
	{
		id: 'RANDOM' as VotingType,
		title: '랜덤으로 정하기',
		subTitle: '랜덤으로 메뉴를 정해요',
		image: '/assets/icons/group_random.svg',
	},
]

export default function VotingMethodModal({ onClose, groupName, onClickPrev, onSubmit }: Props) {
	const [votingMethod, setVotingMethod] = useState<VotingType>('VOTE')

	const handleClickVotingMethod = (votingMethod: VotingType) => {
		setVotingMethod(votingMethod)
	}
	return (
		<Modal onClose={onClose}>
			<div className="flex flex-col items-center gap-8 rounded-[50px] bg-white px-16 py-12">
				<h2 className="text-h2-bold text-center">메뉴를 정하는 방식을 선택해주세요.</h2>

				{/* 투표 방식 버튼 */}
				<ul className="flex w-full space-x-6">
					{VOTING_METHODS.map((method) => (
						<li
							key={method.id}
							className={`flex min-w-[323px] cursor-pointer flex-col items-center justify-center gap-8 rounded-3xl border px-20 py-10 ${votingMethod === method.id ? 'border-orange bg-[#FEF7F5]' : 'border-gray-30'} `}
							onClick={(e) => {
								e.stopPropagation()
								handleClickVotingMethod(method.id)
							}}
						>
							<Image src={method.image} alt={method.title} width={111} height={130} priority />
							<div className="flex flex-col items-center">
								<h3 className="text-h3-bold text-gray-100">{method.title}</h3>
								<p className="text-b3-medium text-gray-100">{method.subTitle}</p>
							</div>
						</li>
					))}
				</ul>

				<div className="flex w-full flex-col gap-4">
					<button
						className={`text-h3-medium bg-orange w-full rounded-[24px] px-8 py-4 text-[#FFFFFF] transition`}
						onClick={() => onSubmit(groupName, votingMethod)}
					>
						<span>그룹만들기</span>
					</button>
					<button
						className={`text-h3-medium w-full rounded-[24px] bg-[#E0E0E0] px-8 py-4 text-black`}
						onClick={onClickPrev}
					>
						뒤로가기
					</button>
				</div>
			</div>
		</Modal>
	)
}
