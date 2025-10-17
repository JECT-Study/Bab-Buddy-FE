import type { VoteResultMenuType, VotingType } from '../../types/group'
import VoteResultItem from './VoteResultItem'

interface VoteResultListProps {
	result: VoteResultMenuType
	menuSelectMethod: VotingType
}

export default function VoteResultList({ result, menuSelectMethod }: VoteResultListProps) {
	return (
		<ul className="flex w-full justify-center gap-6">
			{result.topMenus.map((menu) => (
				<VoteResultItem
					key={menu.rank + menu.menus[0].menuName}
					menu={menu}
					menuSelectMethod={menuSelectMethod}
				/>
			))}
		</ul>
	)
}
