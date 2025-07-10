'use client'

import React, { useState } from 'react'
import { AllergyCard } from '@/shared/components/AllergyCard'

const ALLERGY_LIST = [
	{ label: '견과류', description: '땅콩, 아몬드, 호두 등' },
	{ label: '해산물', description: '새우, 게, 조개류 등' },
	{ label: '유제품', description: '우유, 치즈, 버터 등' },
	{ label: '계란', description: '달걀 및 달걀 제품' },
	{ label: '글루텐', description: '밀, 보리, 호밀 등' },
	{ label: '콩', description: '대두 및 콩 제품' },
	{ label: '생선', description: '모든 종류의 생선' },
	{ label: '조개류', description: '굴, 홍합, 전복 등' },
	{ label: '참깨', description: '참깨 및 참기름' },
	{ label: '아황산염', description: '와인, 건과일 등의 방부제' },
	{ label: 'MSG', description: '글루탐산나트륨' },
	{ label: '인공색소', description: '타르색소 등' },
]

export const AllergySurvey: React.FC = () => {
	const [checked, setChecked] = useState<boolean[]>(Array(12).fill(false))

	const handleToggle = (idx: number) => {
		setChecked((prev) => prev.map((v, i) => (i === idx ? !v : v)))
	}

	const isAnyChecked = checked.some(Boolean)

	return (
		<div className="relative flex flex-col overflow-hidden">
			{/* 로그인 화면으로 돌아가기 버튼 */}
			<div className="mx-auto mt-4 flex h-[27px] w-full px-[72px]">
				<button className="flex items-center text-sm text-orange-500">
					<span className="mr-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="21"
							viewBox="0 0 20 21"
							fill="none"
						>
							<path
								d="M7.93742 10.5L14.0624 4.37501C14.2708 4.16668 14.3716 3.92001 14.3649 3.63501C14.3583 3.35001 14.2505 3.10362 14.0416 2.89585C13.8327 2.68807 13.586 2.5839 13.3016 2.58335C13.0171 2.58279 12.7708 2.68696 12.5624 2.89585L6.16659 9.31251C5.99992 9.47918 5.87493 9.66668 5.79159 9.87501C5.70826 10.0833 5.66659 10.2917 5.66659 10.5C5.66659 10.7083 5.70826 10.9167 5.79159 11.125C5.87493 11.3333 5.99992 11.5208 6.16659 11.6875L12.5833 18.1042C12.7916 18.3125 13.0346 18.4133 13.3124 18.4067C13.5902 18.4 13.8333 18.2922 14.0416 18.0833C14.2499 17.8745 14.3541 17.6278 14.3541 17.3433C14.3541 17.0589 14.2499 16.8125 14.0416 16.6042L7.93742 10.5Z"
								fill="#EA580C"
							/>
						</svg>
					</span>
					로그인 화면으로 돌아가기
				</button>
			</div>

			{/* 본문 */}
			<main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center overflow-hidden">
				<div className="flex h-[144px] flex-col items-center gap-4">
					<div className="text-h2-bold text-center">현재 알레르기를 겪고 있는 식재료가 있나요?</div>
					<div className="text-b2-medium text-gray-30 mb-8 text-center" style={{ height: 54 }}>
						(해당 사항에 모두 체크해주세요. 알레르기가 없으시면 견과류를 눌러주세요)
					</div>
				</div>
				<div className="grid max-h-[60vh] w-full flex-1 gap-[24px] overflow-y-auto md:grid-cols-1 lg:grid-cols-2">
					{ALLERGY_LIST.map((item, idx) => (
						<AllergyCard
							key={idx}
							checked={checked[idx]}
							label={item.label}
							description={item.description}
							onClick={() => handleToggle(idx)}
						/>
					))}
				</div>
			</main>

			{/* 하단 네비 */}
			<div className="fixed right-0 bottom-0 left-0 z-20 flex items-center justify-between bg-white px-[72px] py-6">
				<button className="bg-transparent font-medium text-orange-500">건너뛰기</button>
				<button
					className={`flex items-center font-medium transition ${
						isAnyChecked
							? 'text-orange-500 hover:text-orange-600'
							: 'cursor-not-allowed text-gray-300'
					} bg-transparent px-0 py-0`}
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
	)
}
