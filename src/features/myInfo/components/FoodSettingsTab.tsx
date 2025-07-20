import React, { useState } from 'react'
import { DEFAULT_ALLERGY_LIST, AllergyItem } from '@/shared/constants/allergyList'
import { DislikedFood } from '@/shared/components/DislikedFoodInput'
import { AllergySettingsSection } from './AllergySettingsSection'
import { DislikedFoodsSection } from './DislikedFoodsSection'

export const FoodSettingsTab: React.FC = () => {
	// 기본 알레르기 목록을 사용해서 초기화 (견과류, 해산물은 체크된 상태로)
	const [allergies, setAllergies] = useState<AllergyItem[]>(() =>
		DEFAULT_ALLERGY_LIST.map((allergy, index) => ({
			id: (index + 1).toString(),
			name: allergy.label,
			description: allergy.description,
			checked: index === 0 || index === 1, // 견과류, 해산물만 체크된 상태
		})),
	)

	const [dislikedFoods, setDislikedFoods] = useState<string[]>(['브로콜리', '양파', '피망'])

	const handleAllergyToggle = (id: string) => {
		setAllergies((prev) =>
			prev.map((allergy) =>
				allergy.id === id ? { ...allergy, checked: !allergy.checked } : allergy,
			),
		)
		// TODO: API 호출 추가
	}

	const handleClearAllAllergies = () => {
		setAllergies((prev) => prev.map((allergy) => ({ ...allergy, checked: false })))
		// TODO: API 호출 추가
	}

	const checkedAllergies = allergies.filter((allergy) => allergy.checked)

	return (
		<div className="flex flex-col gap-6">
			{/* Current Excluded Foods Summary */}
			<div className="border-gray-10 flex flex-col gap-6 rounded-3xl border bg-white p-6">
				<h2 className="text-h3-bold text-black">현재 제외된 음식 모아보기</h2>

				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-10">
						<div className="flex w-[119px] items-center gap-10">
							<span className="text-lg text-gray-400">알레르기({checkedAllergies.length})</span>
						</div>
						<div className="flex flex-wrap items-center gap-2">
							{checkedAllergies.map((allergy) => (
								<div
									key={allergy.id}
									className="rounded-[20px] border border-black bg-white px-2.5 py-1"
								>
									<span className="text-sm text-black">{allergy.name}</span>
								</div>
							))}
						</div>
					</div>

					<div className="flex items-center gap-10">
						<span className="text-lg text-gray-400">싫어하는 음식({dislikedFoods.length})</span>
						<div className="flex flex-wrap items-center gap-2">
							{dislikedFoods.map((food, idx) => (
								<div
									key={idx + food}
									className="rounded-[20px] border border-black bg-white px-2.5 py-1"
								>
									<span className="text-sm text-black">{food}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<AllergySettingsSection
				allergies={allergies}
				onAllergyToggle={handleAllergyToggle}
				onClearAllAllergies={handleClearAllAllergies}
			/>

			<DislikedFoodsSection
				dislikedFoods={dislikedFoods}
				onDislikedFoodsChange={setDislikedFoods}
			/>
		</div>
	)
}
