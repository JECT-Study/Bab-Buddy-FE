import { type VoteMenu } from '../../types/group'
import Icon from '@/shared/components/Icon'
import { useState } from 'react'

interface VoteStatusProps {
	voteMenus: VoteMenu[]
}

export default function VoteStatus({ voteMenus }: VoteStatusProps) {
	const [activeMenuId, setActiveMenuId] = useState<string | null>(null)

	const handleClickMenu = async (menu: VoteMenu) => {
		// await voteMenu(menu.menuId)
		setActiveMenuId(menu.menuId)
	}

	return (
		<div className="flex h-full w-full overflow-hidden">
			<ul className="flex w-full flex-col overflow-y-scroll">
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
		</div>
	)
}
