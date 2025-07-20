import React from 'react'
import { AllergyCard } from '@/shared/components/AllergyCard'
import { AllergyItem } from '@/shared/constants/allergyList'

interface AllergySettingsSectionProps {
	allergies: AllergyItem[]
	onAllergyToggle: (id: string) => void
	onClearAllAllergies: () => void
}

export const AllergySettingsSection: React.FC<AllergySettingsSectionProps> = ({
	allergies,
	onAllergyToggle,
	onClearAllAllergies,
}) => {
	return (
		<div className="border-gray-10 flex flex-col gap-6 rounded-3xl border bg-white p-6">
			<div className="flex flex-col gap-2">
				<h2 className="text-h3-bold text-black">알레르기 설정</h2>
				<p className="text-b2-medium text-center text-gray-50">
					알레르기가 있는 식재료를 선택하면 해당 음식은 추천에서 제외됩니다.
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<div className="grid grid-cols-2 gap-4">
					{allergies.map((allergy) => (
						<AllergyCard
							key={allergy.id}
							checked={allergy.checked}
							label={allergy.name}
							description={allergy.description}
							onClick={() => onAllergyToggle(allergy.id)}
						/>
					))}
				</div>

				<button
					onClick={onClearAllAllergies}
					className="bg-orange hover:bg-orange/90 rounded-3xl px-9 py-4 text-center"
				>
					<span className="text-h3-medium text-white">모든 알레르기 설정 해제</span>
				</button>
			</div>
		</div>
	)
}
