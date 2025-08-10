import React, { useEffect, useState } from 'react'
import { AllergyCard } from '@/shared/components/AllergyCard'
import { useAllergy } from '@/features/allergy/hooks/useAllergy'
import { DEFAULT_ALLERGY_LIST } from '@/shared/constants/allergyList'

export const AllergySettingsSection: React.FC = () => {
	const { allergyTypes, handleAllergyToggle, handleAllergyRemove } = useAllergy()
	const [checked, setChecked] = useState<boolean[]>(
		DEFAULT_ALLERGY_LIST.map((allergy) => allergyTypes.includes(allergy.key)),
	)
	const handleToggle = (idx: number) => {
		// 새로운 체크 상태 계산
		const newChecked = checked.map((v, i) => (i === idx ? !v : v))
		// 선택된 알러지 타입들 수집
		const selectedTypes = DEFAULT_ALLERGY_LIST.filter((_, i) => newChecked[i]).map(
			(item) => item.key,
		)
		handleAllergyToggle(selectedTypes)
		setChecked(newChecked)
	}
	useEffect(() => {
		setChecked(DEFAULT_ALLERGY_LIST.map((allergy) => allergyTypes.includes(allergy.key)))
	}, [allergyTypes])
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
					{DEFAULT_ALLERGY_LIST.map((allergy, idx) => (
						<AllergyCard
							key={allergy.key}
							checked={checked[idx]}
							label={allergy.label}
							description={allergy.description}
							onClick={() => handleToggle(idx)}
						/>
					))}
				</div>

				<button
					onClick={handleAllergyRemove}
					className="bg-orange hover:bg-orange/90 rounded-3xl px-9 py-4 text-center"
				>
					<span className="text-h3-medium text-white">모든 알레르기 설정 해제</span>
				</button>
			</div>
		</div>
	)
}
