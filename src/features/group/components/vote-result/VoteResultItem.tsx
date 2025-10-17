import Icon from '@/shared/components/Icon'
import Image from 'next/image'
import type { VoteResultTopMenuType, VotingType } from '../../types/group'
import { useModal } from '@/shared/hooks/useModal'
import VoteResultModal from '../modal/VoteResultModal'

interface VoteResultItemProps {
	menu: VoteResultTopMenuType
	menuSelectMethod: VotingType
}
export default function VoteResultItem({ menu, menuSelectMethod }: VoteResultItemProps) {
	const { openModal, isOpen, closeModal } = useModal()
	const isMoreThanOne = menu.menus.length > 1

	const isVote = menuSelectMethod === 'VOTE'

	return (
		<>
			<li
				key={menu.rank + menu.menus[0].menuName}
				className="relative flex min-h-[263px] w-full max-w-[281px] flex-col justify-between rounded-3xl bg-white p-6"
			>
				{isMoreThanOne && (
					<div className="absolute top-0 right-11 inline-block">
						<div className="bg-orange px-3 pt-1 pb-3 text-center text-[14px] font-bold text-white [clip-path:polygon(0_0,100%_0,100%_100%,50%_85%,0_100%)]">
							<div className="">공동</div>
							<div className="">{menu.rank}위</div>
						</div>
					</div>
				)}
				<div className="flex flex-col gap-[10px]">
					<span className="text-b2-medium">{menu.menus[0].menuName}</span>
					{isMoreThanOne && (
						<div className="flex w-fit cursor-pointer items-center" onClick={openModal}>
							<span className="text-b2-medium mr-1 text-gray-50">외 {menu.menus.length - 1}개</span>
							<Icon.ArrowRight size={15} className="text-gray-50" />
						</div>
					)}
				</div>
				<div className={`flex w-full items-end ${isVote ? 'justify-between' : 'justify-center'}`}>
					{isVote && <span className="text-b1-bold text-orange">득표 수 {menu.count}</span>}
					<Image
						src={
							menu.rank === 1
								? '/assets/icons/group_result_gold.svg'
								: menu.rank === 2
									? '/assets/icons/group_result_silver.svg'
									: '/assets/icons/group_result_copper.svg'
						}
						alt={`${menu.rank}등 표시 이미지`}
						width={96}
						height={103}
					/>
				</div>
			</li>
			<VoteResultModal isOpen={isOpen} onClose={closeModal} menu={menu} />
		</>
	)
}
