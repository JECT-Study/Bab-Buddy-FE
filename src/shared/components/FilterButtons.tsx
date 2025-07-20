import React from 'react'

export type FilterCategory = '전체' | '한식' | '중식' | '일식' | '양식' | '기타'

interface FilterButtonsProps {
	selectedCategory: FilterCategory
	onCategoryChange: (category: FilterCategory) => void
}

const FILTER_OPTIONS: FilterCategory[] = ['전체', '한식', '중식', '일식', '양식', '기타']

export const FilterButtons: React.FC<FilterButtonsProps> = ({
	selectedCategory,
	onCategoryChange,
}) => {
	return (
		<div className="flex items-center gap-2">
			{FILTER_OPTIONS.map((category) => (
				<button
					key={category}
					onClick={() => onCategoryChange(category)}
					className={`text-b2-bold rounded-3xl px-4 py-2 transition-colors ${
						selectedCategory === category ? 'bg-orange text-white' : 'text-gray-30 bg-white'
					}`}
				>
					{category}
				</button>
			))}
		</div>
	)
}
