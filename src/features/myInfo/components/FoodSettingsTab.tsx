import React from 'react'
import { DEFAULT_ALLERGY_LIST } from '@/shared/constants/allergyList'
import { AllergySettingsSection } from './AllergySettingsSection'
import { DislikedFoodsSection } from './DislikedFoodsSection'
import { useDislikedFoodStore } from '@/features/dislikedFoodInput/store/dislikedFoodStore'
import { useAllergyStore } from '@/features/allergy/store/allergyStore'

export const FoodSettingsTab: React.FC = () => {
	// 기본 알레르기 목록을 사용해서 초기화 (견과류, 해산물은 체크된 상태로)
	const { allergyTypes } = useAllergyStore()
	const { foods } = useDislikedFoodStore()

	return (
		<div className="flex flex-col gap-6">
			{/* Current Excluded Foods Summary */}
			<div className="border-gray-10 flex flex-col gap-6 rounded-3xl border bg-white p-6">
				<h2 className="text-h3-bold text-black">현재 제외된 음식 모아보기</h2>

				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-10">
						<div className="flex w-[119px] items-center gap-10">
							<span className="text-lg text-gray-400">알레르기({allergyTypes.length})</span>
						</div>
						<div className="flex flex-wrap items-center gap-2">
							{allergyTypes.map((allergy) => (
								<div
									key={allergy}
									className="rounded-[20px] border border-black bg-white px-2.5 py-1"
								>
									<span className="text-sm text-black">
										{DEFAULT_ALLERGY_LIST.find((item) => item.key === allergy)?.label}
									</span>
								</div>
							))}
						</div>
					</div>

					<div className="flex items-center gap-10">
						<span className="text-lg text-gray-400">싫어하는 음식({foods.length})</span>
						<div className="flex flex-wrap items-center gap-2">
							{foods.map((food) => (
								<div
									key={food.id + food.foodName}
									className="rounded-[20px] border border-black bg-white px-2.5 py-1"
								>
									<span className="text-sm text-black">{food.foodName}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<AllergySettingsSection />

			<DislikedFoodsSection />
		</div>
	)
}
