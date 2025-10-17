'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { MenuItemType } from '../../types/group'
import Icon from '@/shared/components/Icon'
import { updateMenuOnVoteRoom } from '../../api/voteRoomApi'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useUser } from '@/shared/hooks/useUser'

interface MenuItemProps {
	menu: MenuItemType
	handleDeleteMenu?: (menuId: string, menuName: string) => void
	disableEdit?: boolean
}

const useMenuItem = (menu: MenuItemType) => {
	const queryClient = useQueryClient()
	const { id } = useParams()

	const [isEditable, setIsEditable] = useState(false)
	const [menuName, setMenuName] = useState(menu.name)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleChangeMenuName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setMenuName(e.target.value)
	}, [])

	const handleUpdateMenuName = useCallback(async () => {
		const isUpdated = await updateMenuOnVoteRoom(menu.menuId, menuName)
		if (isUpdated) {
			queryClient.invalidateQueries({ queryKey: ['group', id] })
		}
	}, [menu.menuId, menuName, queryClient, id])

	const handleKeyDown = useCallback(
		async (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				await handleUpdateMenuName()
				setIsEditable(false)
				inputRef.current?.blur()
			}
		},
		[setIsEditable, handleUpdateMenuName],
	)

	const handleEditable = useCallback(async () => {
		if (isEditable) {
			await handleUpdateMenuName()
		}
		setIsEditable((prev) => !prev)
	}, [setIsEditable, handleUpdateMenuName, isEditable])

	useEffect(() => {
		// isEditable이 true가 되면 input에 포커스
		if (isEditable) {
			inputRef.current?.focus()
		}
	}, [isEditable])

	return {
		isEditable,
		menuName,
		inputRef,
		handleChangeMenuName,
		handleKeyDown,
		handleEditable,
	}
}

export default function MenuItem({ menu, handleDeleteMenu, disableEdit = false }: MenuItemProps) {
	const { user } = useUser()
	const isMyMenu = disableEdit ? menu.createdBy === user?.userId : menu.createdBy === user?.name

	const { isEditable, menuName, inputRef, handleChangeMenuName, handleKeyDown, handleEditable } =
		useMenuItem(menu)

	return (
		<li
			className="border-gray-10 flex w-full items-center justify-between border-b p-6"
			data-menu-id={menu.menuId}
		>
			<input
				name="menuName"
				className="text-b2-medium flex-1 text-gray-100 outline-none"
				value={menuName}
				onChange={handleChangeMenuName}
				onKeyDown={handleKeyDown}
				disabled={disableEdit ? true : !isEditable}
				ref={inputRef}
			/>
			<div className="flex items-center gap-4">
				{!disableEdit && (
					<button
						className={`text-b3-medium bg-gray-5 rounded-3xl px-4 py-2 text-gray-50 outline-none ${!isMyMenu ? 'opacity-50' : ''}`}
						onClick={handleEditable}
						disabled={!isMyMenu}
					>
						<span>{isEditable ? '변경 완료' : '메뉴 변경'}</span>
					</button>
				)}
				<button
					className={`text-b3-medium bg-gray-5 rounded-3xl px-4 py-2 text-gray-50 outline-none ${!isMyMenu ? 'opacity-50' : ''}`}
					onClick={() => handleDeleteMenu?.(menu.menuId, menu.name)}
					disabled={!isMyMenu}
				>
					<Icon.Trash />
				</button>
			</div>
		</li>
	)
}
