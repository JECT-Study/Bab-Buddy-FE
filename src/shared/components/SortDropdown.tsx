'use client'

import React, { useState, useRef, useEffect } from 'react'

export type SortOption = '최신순' | '오래된순'

interface SortDropdownProps {
	selectedSort: SortOption
	onSortChange: (sort: SortOption) => void
}

const SORT_OPTIONS: SortOption[] = ['최신순', '오래된순']

export const SortDropdown: React.FC<SortDropdownProps> = ({ selectedSort, onSortChange }) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleSelect = (option: SortOption) => {
		onSortChange(option)
		setIsOpen(false)
	}

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="border-gray-30 flex w-[100px] items-center justify-center gap-1 rounded-3xl border bg-white px-4 py-2"
			>
				<span className="text-b2-medium text-black">{selectedSort}</span>
				<div className="h-4 w-4">
					<svg
						className={`h-full w-full transition-transform ${isOpen ? 'rotate-180' : ''}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 16 16"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6l4 4 4-4"
							stroke="#000000"
						/>
					</svg>
				</div>
			</button>

			{isOpen && (
				<div className="border-gray-10 absolute top-full z-10 mt-1 w-full rounded-2xl border bg-white py-2 shadow-lg">
					{SORT_OPTIONS.map((option) => (
						<button
							key={option}
							onClick={() => handleSelect(option)}
							className={`text-b2-medium hover:bg-gray-5 w-full px-4 py-2 text-left transition-colors ${
								option === selectedSort ? 'text-orange font-bold' : 'text-black'
							}`}
						>
							{option}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
