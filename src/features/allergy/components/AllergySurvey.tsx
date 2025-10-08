'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AllergyCard } from '@/shared/components/AllergyCard'
import { DEFAULT_ALLERGY_LIST } from '@/shared/constants/allergyList'
import { useAllergy } from '../hooks/useAllergy'
const BUTTON_AREA_PADDING = 'pb-24'
const HEADER_HEIGHT_PX = 108 // 헤더 높이 108px로 가정
const BUTTON_HEIGHT_PX = 80 // 하단 고정 버튼 높이를 80px로 가정 (py-5 기준)
const TOTAL_HEIGHT_DEDUCTION = HEADER_HEIGHT_PX + BUTTON_HEIGHT_PX // 총 188px

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

	return (
		<>
			{/* 본문 */}
			<div
				style={{ '--total-deduction': `${TOTAL_HEIGHT_DEDUCTION}px` }}
				className="relative flex h-[calc(100vh-var(--total-deduction))] flex-col"
			>
				<main
					className={`mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pt-10 sm:px-6 lg:px-8`}
				>
					<div className="mb-8 flex h-[82px] flex-col items-center gap-4">
						<div className="text-h2-bold text-center">
							현재 알레르기를 겪고 있는 식재료가 있나요?
						</div>
						<div className="text-b2-medium text-gray-30 text-center" style={{ height: 54 }}>
							(해당 사항이 있다면 모두 체크해주세요. 없다면 ‘다음 단계’ 버튼을 눌러 넘어가주세요.)
						</div>
					</div>
					{/* 중앙 그리드 */}
					<div
						className={`grid min-h-0 w-full flex-1 gap-[24px] md:grid-cols-1 lg:grid-cols-2 ${BUTTON_AREA_PADDING} overflow-y-auto`}
					>
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
				</main>

				{/* 오른쪽 버튼 */}
				<div className="fixed inset-x-0 bottom-0 z-10 bg-white shadow-md">
					<div className="mx-auto flex w-full max-w-5xl justify-end px-4 py-5 sm:px-6 lg:px-8">
						<button
							className="flex items-center font-medium text-orange-500 transition hover:text-orange-600"
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
			</div>
		</>
	)
}
