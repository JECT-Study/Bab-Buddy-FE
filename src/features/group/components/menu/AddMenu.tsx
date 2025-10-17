'use client'
import { useCallback, useState } from 'react'
import type { MenuItemType, VotingType } from '../../types/group'
import Image from 'next/image'
import MenuItem from './MenuItem'
import MenuInputForm from '../input/MenuInputForm'
import { addMenuOnVoteRoom, deleteMenuOnVoteRoom } from '../../api/voteRoomApi'
import { useUser } from '@/shared/hooks/useUser'
import SwitchCases from '@/shared/components/SwitchCases'
import { useQueryClient } from '@tanstack/react-query'

type AddMenuProps = {
	roomId: string
	menuList: MenuItemType[]
	menuSelectMethod: VotingType
}

const Loading = () => {
	return (
		<div className="flex flex-1 items-center justify-center">
			<div className="border-gray-30 h-8 w-8 animate-spin rounded-full border-t-2 border-b-2"></div>
		</div>
	)
}

const Error = ({ error }: { error: Error | null }) => {
	return (
		<div className="flex flex-1 flex-col items-center justify-center rounded-lg bg-red-50 p-4">
			<p className="text-b1-bold mb-2 text-red-500">문제가 발생했습니다.</p>
			<p className="text-gray-80 mb-4">{error?.message ?? '알 수 없는 오류가 발생했습니다.'}</p>
			<button
				className="rounded bg-red-400 px-4 py-2 font-semibold text-white transition hover:bg-red-500"
				onClick={() => window.location.reload()}
			>
				새로고침
			</button>
		</div>
	)
}

const MenuList = ({
	roomId,
	menus,
	menuSelectMethod,
}: {
	roomId: string
	menus: MenuItemType[]
	menuSelectMethod: VotingType
}) => {
	const queryClient = useQueryClient()

	const handleDeleteMenu = useCallback(
		async (menuId: string) => {
			const isDeleted = await deleteMenuOnVoteRoom(menuId)
			if (isDeleted) {
				queryClient.invalidateQueries({ queryKey: ['group', menuSelectMethod, roomId] })
			}
		},
		[roomId, menuSelectMethod, queryClient],
	)

	return (
		<>
			{/* 메뉴 목록 */}
			{menus.length > 0 ? (
				<ul className="flex max-h-[339px] flex-1 flex-col gap-2 overflow-y-auto">
					{menus.map((menu) => (
						<MenuItem key={menu.menuId} menu={menu} handleDeleteMenu={handleDeleteMenu} />
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

export default function AddMenu({ roomId, menuList, menuSelectMethod }: AddMenuProps) {
	const [menus, setMenus] = useState(menuList)
	const { user, loading, error } = useUser()

	const queryClient = useQueryClient()

	const handleSubmit = async (inputValue: string) => {
		const menuId = await addMenuOnVoteRoom(roomId, inputValue)
		if (menuId == null) {
			alert('메뉴 등록에 실패했습니다.')
			return
		}

		setMenus((prev: MenuItemType[]) => [
			...prev,
			{ menuId: menuId, name: inputValue, createdBy: user?.name ?? '' },
		])
		queryClient.invalidateQueries({ queryKey: ['group', menuSelectMethod, roomId] })
	}

	return (
		<>
			<MenuInputForm onSubmit={handleSubmit} />
			<SwitchCases
				value={error != null ? 'error' : loading ? 'loading' : 'menuList'}
				cases={{
					error: <Error error={error} />,
					loading: <Loading />,
					menuList: <MenuList roomId={roomId} menus={menus} menuSelectMethod={menuSelectMethod} />,
				}}
			/>
		</>
	)
}
