'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AllergyCard } from '@/shared/components/AllergyCard'
import { DEFAULT_ALLERGY_LIST } from '@/shared/constants/allergyList'
import { useAllergy } from '../hooks/useAllergy'

export const AllergySurvey: React.FC = () => {
	const router = useRouter()
	const [checked, setChecked] = useState<boolean[]>(Array(DEFAULT_ALLERGY_LIST.length).fill(false))
	const [isLoading, setIsLoading] = useState(false)
	const { handleAllergyToggle } = useAllergy()
	const onClickNextStep = () => {
		router.push('/dislikedFoodSurvey')
	}

	const handleToggle = async (idx: number, _item: string) => {
		if (isLoading) return

		try {
			setIsLoading(true)
			// 새로운 체크 상태 계산
			const newChecked = checked.map((v, i) => (i === idx ? !v : v))
			// 선택된 알러지 타입들 수집
			const selectedTypes = DEFAULT_ALLERGY_LIST.filter((_, i) => newChecked[i]).map(
				(item) => item.key,
			)

			// API 호출
			handleAllergyToggle(selectedTypes)
			setChecked(newChecked)
		} catch {
			alert('알러지 정보 저장에 실패했습니다. 다시 시도해주세요.')
		} finally {
			setIsLoading(false)
		}
	}

	const isAnyChecked = checked.some(Boolean)

	return (
		<>
			{/* 본문 */}
			<main className="mx-auto flex h-[calc(100vh-110px)] w-full max-w-5xl flex-1 flex-col items-center gap-[48px] overflow-auto pb-10 pb-[90px]">
				<div className="flex h-[82px] flex-col items-center gap-4">
					<div className="text-h2-bold text-center">현재 알레르기를 겪고 있는 식재료가 있나요?</div>
					<div className="text-b2-medium text-gray-30 mb-8 text-center" style={{ height: 54 }}>
						(해당 사항에 모두 체크해주세요. 알레르기가 없으시면 건너뛰기를 눌러주세요)
					</div>
				</div>
				<div className="flex h-full w-full flex-1 items-end gap-4">
					{/* 왼쪽 버튼 */}
					<div className="flex h-full flex-col justify-end">
						<button
							className="text-orientation-mixed bg-transparent font-medium text-orange-500"
							onClick={onClickNextStep}
						>
							건너뛰기
						</button>
					</div>

					{/* 중앙 그리드 */}
					<div className="grid h-full w-full flex-1 gap-[24px] overflow-y-auto md:grid-cols-1 lg:grid-cols-2">
						{DEFAULT_ALLERGY_LIST.map((item, idx) => (
							<AllergyCard
								key={item.label}
								checked={checked[idx]}
								label={item.label}
								description={item.description}
								onClick={() => handleToggle(idx, item.key)}
							/>
						))}
					</div>

					{/* 오른쪽 버튼 */}
					<div className="flex h-full flex-col justify-end">
						<button
							className={`flex items-center font-medium transition ${
								isAnyChecked
									? 'text-orange-500 hover:text-orange-600'
									: 'cursor-not-allowed text-gray-300'
							}`}
							disabled={!isAnyChecked}
							onClick={onClickNextStep}
						>
							다음단계
							<svg className="ml-1" width="20" height="20" fill="none" viewBox="0 0 20 20">
								<path
									d="M8 5l5 5-5 5"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>
				</div>
			</main>
		</>
	)
}
