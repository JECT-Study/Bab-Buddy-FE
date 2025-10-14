import { useState } from 'react'
import { MenuItemType } from '../../types/group'
import Image from 'next/image'
import MenuItem from './MenuItem'
import MenuInputForm from '../input/MenuInputForm'
import { addMenuOnVoteRoom } from '../../api/voteRoomApi'
import { useUser } from '@/shared/hooks/useUser'

type AddMenuProps = {
	roomId: string
	menuList: MenuItemType[]
}

export default function AddMenu({ roomId, menuList }: AddMenuProps) {
	const [menus, setMenus] = useState(menuList)
	const { user, loading, error } = useUser()

	// 로딩 중이거나 에러가 있을 때 처리
	if (loading) {
		return <div>사용자 정보를 불러오는 중...</div>
	}

	if (error) {
		return <div>사용자 정보를 불러오는데 실패했습니다.</div>
	}

	const handleSubmit = async (inputValue: string) => {
		const menuId = await addMenuOnVoteRoom(roomId, inputValue)
		if (menuId == null) {
			alert('메뉴 등록에 실패했습니다.')
			return
		}

		setMenus((prev: MenuItemType[]) => [
			...prev,
			{ id: menuId, name: inputValue, createdBy: user?.userId ?? '' },
		])
	}

	return (
		<>
			<MenuInputForm onSubmit={handleSubmit} />
			{/* 메뉴 목록 */}
			{menus.length > 0 ? (
				<ul className="flex max-h-[339px] flex-1 flex-col gap-2 overflow-y-auto">
					{menus.map((menu) => (
						<MenuItem key={menu.id} menu={menu} setMenus={setMenus} />
					))}
				</ul>
			) : (
				<div className="text-b2-medium text-gray-30 flex flex-1 flex-col items-center justify-center rounded-3xl">
					<Image
						src="/assets/images/groupVote-blank-babbuddy.webp"
						alt="no_menu"
						width={209}
						height={128}
						className="object-contain"
						priority
					/>
					<p className="text-b2-medium text-gray-30 flex flex-col items-center justify-center gap-2">
						<span className="mb-2 text-gray-100">첫 메뉴를 등록해보세요!</span>
						<span className="text-center whitespace-pre-line">{`좋아하는 음식이나 식당을 입력하면\n 다른 사람들과 투표할 수 있어요.`}</span>
					</p>
				</div>
			)}
		</>
	)
}
