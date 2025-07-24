'use client'

import React, { useState } from 'react'
import { AllergyCard } from '@/shared/components/AllergyCard'
import { DEFAULT_ALLERGY_LIST } from '@/shared/constants/allergyList'

export const AllergySurvey: React.FC = () => {
	const [checked, setChecked] = useState<boolean[]>(Array(DEFAULT_ALLERGY_LIST.length).fill(false))

	const handleToggle = (idx: number) => {
		setChecked((prev) => prev.map((v, i) => (i === idx ? !v : v)))
		// TODO: API 호출 추가
	}

	const isAnyChecked = checked.some(Boolean)

	return (
		<>
			{/* 본문 */}
			<main className="mx-auto flex h-[calc(100vh-110px)] w-full max-w-5xl flex-1 flex-col items-center gap-[48px] overflow-auto pb-10 pb-[90px]">
				<div className="flex h-[82px] flex-col items-center gap-4">
					<div className="text-h2-bold text-center">현재 알레르기를 겪고 있는 식재료가 있나요?</div>
					<div className="text-b2-medium text-gray-30 mb-8 text-center" style={{ height: 54 }}>
						(해당 사항에 모두 체크해주세요. 알레르기가 없으시면 견과류를 눌러주세요)
					</div>
				</div>
				<div className="flex h-full w-full flex-1 items-end gap-4">
					{/* 왼쪽 버튼 */}
					<div className="flex h-full flex-col justify-end">
						<button className="text-orientation-mixed bg-transparent font-medium text-orange-500">
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
								onClick={() => handleToggle(idx)}
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
