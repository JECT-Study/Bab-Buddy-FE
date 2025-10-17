'use client'
import Icon from '@/shared/components/Icon'
import React from 'react'
import clsx from 'clsx'

interface AddMenuBUttonProps {
	isDisabled?: boolean
	size?: 'FULL' | 'MEDIUM'
	onClick: () => void
}

export default function AddMenuButton({
	isDisabled = false,
	size = 'MEDIUM',
	onClick,
}: AddMenuBUttonProps) {
	return (
		<button
			className={clsx(
				'text-b3-medium flex h-full items-center justify-center gap-1 rounded-3xl px-6 py-2 text-white',
				size === 'FULL' ? 'w-full' : 'w-32',
				isDisabled ? 'bg-gray-30' : 'bg-gray-100',
			)}
			onClick={onClick}
			disabled={isDisabled}
		>
			{size === 'FULL' && <Icon.Plus />}
			메뉴 추가하기
		</button>
	)
}
