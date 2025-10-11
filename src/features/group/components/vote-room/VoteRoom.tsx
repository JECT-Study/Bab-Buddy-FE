import { type GroupDetailType, type VoteMenu } from '../../types/group'
import Icon from '@/shared/components/Icon'
import Image from 'next/image'
import { useState } from 'react'

interface VoteRoomProps {
	voteMenus: VoteMenu[]
	room: GroupDetailType
}

export default function VoteRoom({ voteMenus, room }: VoteRoomProps) {
	const [activeMenuId, setActiveMenuId] = useState<string | null>(null)

	const handleClickMenu = async (menu: VoteMenu) => {
		// await voteMenu(menu.menuId)
		setActiveMenuId(menu.menuId)
	}

	return (
		<>
			{/* VRConetnt의 스텝 제목 높이 통일되어 있지 않아 -35px mt 추가 */}
			<div className="bg-gray-5 -mt-[35px] mb-4 min-h-[58px] w-full rounded-3xl px-6 py-4">
				<div className="text-b3-bold flex flex-col gap-2">
					<span>⚠️ 이런 메뉴는 못먹거나 오늘 먹고 싶지 않아요</span>
					<ul className="flex gap-2">
						{room.dislikeMenuList.length > 0 ? (
							room.dislikeMenuList.map((menu) => (
								<li
									key={menu.id}
									className="text-b3-medium text-whi rounded-[20px] bg-gray-50 px-4 py-1 text-white"
								>
									{menu.name}
								</li>
							))
						) : (
							<li className="text-b3-medium text-gray-50">등록된 못 먹는 메뉴가 없어요.</li>
						)}
					</ul>
				</div>
			</div>
			<ul className="flex max-h-[339px] w-full flex-1 flex-col overflow-y-auto">
				{voteMenus.length ? (
					voteMenus.map((menu) => (
						<li
							key={menu.menuId}
							className="border-gray-10 flex items-center justify-between border-b p-6"
						>
							<span className="text-b2-medium">{menu.name}</span>
							<button
								className={`flex items-center justify-center rounded-3xl px-4 py-2 ${activeMenuId === menu.menuId ? 'bg-gray-100' : 'bg-gray-5'}`}
								onClick={() => handleClickMenu(menu)}
							>
								<Icon.ThumbsUp
									size={24}
									className={`${activeMenuId === menu.menuId ? 'fill-white' : ''}`}
								/>
							</button>
						</li>
					))
				) : (
					<div className="flex h-full w-full flex-1 flex-col items-center justify-center bg-white p-6">
						<Image
							src="/assets/icons/group_blank_vote.svg"
							alt="no_menu"
							width={111}
							height={115}
							className="mb-8 object-contain"
						/>
						<p className="text-b3-medium flex flex-col items-center gap-2">
							<span className="text-b1-medium text-gray-100">아직 투표할 메뉴가 없어요!</span>
							<span className="text-b2-medium text-gray-30 text-center whitespace-pre-line">
								{`팀원들이 메뉴 제안하기에서 메뉴를 등록하면,\n 곧 이곳에서 투표할 수 있어요.`}
							</span>
						</p>
					</div>
				)}
			</ul>
		</>
	)
}
