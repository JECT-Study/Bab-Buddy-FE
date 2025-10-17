'use client'
import Modal from './Modal'
import { type VotingType } from '../../types/group'

interface VoteEndModalProps {
	voteMethod: VotingType
	isOpen: boolean
	onClose: () => void
	callbackOnFinishVote: () => void
}

const TEXT_MAP = {
	VOTE: {
		title: '투표를 종료하고 결과를 확인하세요',
		subTitle: '(투표가 종료되면 더이상 메뉴 제안 및 투표를 할 수 없습니다.)',
	},
	ROULETTE: {
		title: '룰렛을 돌려 결과를 확인하세요',
		subTitle: '(룰렛을 돌리면 더이상 제안되는 메뉴를 반영하지 않습니다.)',
	},
}

export default function VoteEndModal({
	isOpen,
	onClose,
	voteMethod,
	callbackOnFinishVote,
}: VoteEndModalProps) {
	if (!isOpen) return null

	const { title, subTitle } = TEXT_MAP[voteMethod]
	const isVote = voteMethod === 'VOTE'

	return (
		<Modal onClose={onClose}>
			<div className="flex w-[527px] flex-col items-center rounded-[50px] bg-white px-16 py-12">
				<h2 className="text-h3-bold mb-2 text-center">{title}</h2>
				<p className="text-b2-medium text-gray-30 mb-8 text-center">{subTitle}</p>
				<div className="flex w-full flex-col gap-4">
					<button
						onClick={callbackOnFinishVote}
						className="bg-orange flex w-full items-center justify-center rounded-[50px] px-8 py-4 text-white"
					>
						<span className="text-b2-medium leading-6 tracking-[-0.02em]">
							{isVote ? '투표 종료하고 결과 확인하기' : '룰렛 돌리기'}
						</span>
					</button>
					<button
						onClick={onClose}
						className="bg-gray-10 flex w-full items-center justify-center gap-20 rounded-[50px] px-8 py-4"
					>
						<span className="text-b2-medium leading-6 tracking-[-0.02em]">취소</span>
					</button>
				</div>
			</div>
		</Modal>
	)
}
