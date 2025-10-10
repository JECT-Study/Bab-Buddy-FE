'use client'

import React from 'react'
import { FoodCategory, FoodCategorySelectorProps } from '../types/rouletteTypes'

const categories: FoodCategory[] = ['전체', '한식', '중식', '일식', '양식', '기타']

const FoodCategorySelector: React.FC<FoodCategorySelectorProps> = ({
	selectedCategory,
	onCategoryChange,
}) => {
	return (
		<div className="space-y-4">
			<h3 className="text-b2-bold text-gray-100">음식 종류별 고르기</h3>
			<div className="flex grid grid-cols-2 justify-center gap-2 sm:flex sm:gap-3">
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => onCategoryChange(category)}
						className={`flex-1 rounded-[24px] px-3 py-2 transition-all duration-200 sm:px-4 ${
							selectedCategory === category
								? 'border-orange border border-solid bg-[#FEF7F3]'
								: 'border-gray-10 hover:border-orange hover:text-orange border border-solid bg-white text-gray-100'
						}`}
					>
						{category}
					</button>
				))}
			</div>
		</div>
	)
}

export default FoodCategorySelector
