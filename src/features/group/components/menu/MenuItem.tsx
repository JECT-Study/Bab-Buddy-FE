'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { MenuItemType } from '../../types/group'
import Icon from '@/shared/components/Icon'
// import { deleteMenuOnVoteRoom } from '../../api/voteRoomApi'

interface MenuItemProps {
	menu: MenuItemType
	setMenus: React.Dispatch<React.SetStateAction<MenuItemType[]>>
	disableEdit?: boolean
}

const useMenuItem = (
	menu: MenuItemType,
	setMenus: React.Dispatch<React.SetStateAction<MenuItemType[]>>,
) => {
	const [isEditable, setIsEditable] = useState(false)
	const [menuName, setMenuName] = useState(menu.name)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleChangeMenuName = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setMenuName(e.target.value)
		},
		[setMenuName],
	)

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				setIsEditable(false)
				inputRef.current?.blur()
			}
		},
		[setIsEditable],
	)

	const handleEditable = useCallback(() => {
		setIsEditable((prev) => !prev)
	}, [setIsEditable])

	const hanedleDeleteMenu = useCallback(async () => {
		// await deleteMenuOnVoteRoom(menu.id)
		setMenus((prev) => prev.filter((_menu) => _menu.id !== menu.id))
	}, [setMenus, menu.id])

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
		hanedleDeleteMenu,
	}
}

export default function MenuItem({ menu, setMenus, disableEdit = false }: MenuItemProps) {
	const {
		isEditable,
		menuName,
		inputRef,
		handleChangeMenuName,
		handleKeyDown,
		handleEditable,
		hanedleDeleteMenu,
	} = useMenuItem(menu, setMenus)

	return (
		<li
			className="border-gray-10 flex w-full items-center justify-between border-b p-6"
			data-menu-id={menu.id}
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
						className="text-b3-medium bg-gray-5 rounded-3xl px-4 py-2 text-gray-50 outline-none"
						onClick={handleEditable}
					>
						<span>{isEditable ? '변경 완료' : '메뉴 변경'}</span>
					</button>
				)}
				<button
					className="text-b3-medium bg-gray-5 rounded-3xl px-4 py-2 text-gray-50 outline-none"
					onClick={hanedleDeleteMenu}
				>
					<Icon.Trash />
				</button>
			</div>
		</li>
	)
}
