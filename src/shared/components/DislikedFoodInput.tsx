'use client'

import React, { useState } from 'react'
import Icon from './Icon'

interface DislikedFoodInputProps {
	foods: string[]
	onFoodsChange: (foods: string[]) => void
}

export const DislikedFoodInput: React.FC<DislikedFoodInputProps> = ({ foods, onFoodsChange }) => {
	const maxCount = 20
	const [inputValue, setInputValue] = useState('')

	const handleAddFood = () => {
		const trimmedValue = inputValue.trim()
		if (trimmedValue && !foods.some((food) => food === trimmedValue)) {
			onFoodsChange([...foods, trimmedValue])
			setInputValue('')
		}
	}

	const handleRemoveFood = (food: string) => {
		onFoodsChange(foods.filter((f) => f !== food))
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleAddFood()
		}
	}

	return (
		<div className="flex flex-col">
			{/* 음식 입력 필드 */}
			<div className="mb-8">
				<div className="flex items-center gap-[20px]">
					<div className="flex-1">
						<input
							type="text"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder="싫어하는 음식을 입력해주세요 (예: 브로콜리)"
							className="text-b1-medium w-full rounded-full border border-gray-300 px-6 py-4 placeholder-gray-400 focus:border-orange-500 focus:outline-none"
						/>
					</div>
					<button
						onClick={handleAddFood}
						disabled={!inputValue.trim() || foods.length >= maxCount}
						className={`bg-orange flex h-14 w-[90px] items-center justify-center rounded-[24px] text-white ${
							inputValue.trim() ? '' : 'cursor-not-allowed opacity-[0.5]'
						}`}
					>
						<Icon.Plus />
					</button>
				</div>
			</div>

			{/* 현재 등록된 싫어하는 음식 */}

			<div className="mb-8">
				<h2 className="text-h3-bold text-gray-90 mb-4">현재 등록된 싫어하는 음식</h2>
				<div className="flex min-h-[60px] flex-wrap items-center gap-2">
					{foods.length > 0 ? (
						foods.map((food, idx) => (
							<div
								key={idx + food}
								className="border-gray-30 flex items-center rounded-[24px] border px-[24px] py-[16px]"
								style={{ border: '1px solid #E0E0E0' }}
							>
								<span className="text-b2-medium text-gray-70">{food}</span>
								<button
									onClick={() => handleRemoveFood(food)}
									className="ml-2 text-gray-400 hover:text-gray-600"
								>
									×
								</button>
							</div>
						))
					) : (
						<p className="text-b2-medium text-gray-40">등록된 음식이 없습니다.</p>
					)}
				</div>
			</div>
		</div>
	)
}
