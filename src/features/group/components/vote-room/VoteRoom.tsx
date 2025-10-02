import { type GroupDetailType, type VoteMenu } from '../../types/group'
import Icon from '@/shared/components/Icon'
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
			<div className="bg-gray-5 mb-4 min-h-[58px] w-full rounded-3xl px-6 py-4">
				<div className="text-b3-bold flex flex-col gap-2">
					<span>⚠️ 이런 메뉴는 못먹거나 오늘 먹고 싶지 않아요</span>
					<ul className="flex gap-2">
						{room.dislikeMenuList.map((menu) => (
							<li
								key={menu.id}
								className="text-b3-medium text-whi rounded-[20px] bg-gray-50 px-4 py-1 text-white"
							>
								{menu.name}
							</li>
						))}
					</ul>
				</div>
			</div>
			<ul className="flex w-full flex-1 flex-col overflow-y-scroll">
				{voteMenus.map((menu) => (
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
				))}
			</ul>
		</>
	)
}
