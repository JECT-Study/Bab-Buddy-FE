import React from 'react'
import { DislikedFoodInput } from '@/shared/components/DislikedFoodInput'

interface DislikedFoodsSectionProps {
	dislikedFoods: string[]
	onDislikedFoodsChange: (foods: string[]) => void
}

export const DislikedFoodsSection: React.FC<DislikedFoodsSectionProps> = ({
	dislikedFoods,
	onDislikedFoodsChange,
}) => {
	return (
		<div className="border-gray-10 flex flex-col gap-6 rounded-3xl border bg-white p-6">
			<div className="flex flex-col gap-2">
				<h2 className="text-h3-bold text-black">싫어하는 음식</h2>
				<p className="text-b2-medium text-center text-gray-50">
					싫어하는 음식을 등록하면 해당 음식은 추천에서 제외됩니다.
				</p>
			</div>

			<DislikedFoodInput foods={dislikedFoods} onFoodsChange={onDislikedFoodsChange} />
		</div>
	)
}
