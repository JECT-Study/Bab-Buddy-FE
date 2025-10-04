import type { VoteResultMenuType } from '../../types/group'
import VoteResultItem from './VoteResultItem'

interface VoteResultListProps {
	result: VoteResultMenuType
}

export default function VoteResultList({ result }: VoteResultListProps) {
	return (
		<ul className="flex w-full justify-center gap-6">
			{result.topMenus.map((menu) => (
				<VoteResultItem key={menu.rank + menu.menus[0].menuName} menu={menu} />
			))}
		</ul>
	)
}
