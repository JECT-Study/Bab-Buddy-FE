'use client'

import React, { useState } from 'react'
import Icon from '@/shared/components/Icon'
import SurveyCard from '@/features/foodSurvey/components/SurveyCard'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FoodSurveyIconType } from '@/features/foodSurvey/types/foodSurveyType'

export interface SurveyOption {
	id: string
	label: string
	sublabel: string
	icon: FoodSurveyIconType
}

interface FoodSurveyProps {
	step: number
	beforeText: string
	highlightText: string
	afterText: string
	subtitle: string
	backgroundImage: string
	options: SurveyOption[]
}

export const FoodSurvey: React.FC<FoodSurveyProps> = ({
	step,
	beforeText,
	highlightText,
	afterText,
	subtitle,
	backgroundImage,
	options,
}) => {
	const [selectedTaste, setSelectedTaste] = useState<string | null>(null)
	const router = useRouter()

	const handleSelect = (tasteId: string) => {
		setSelectedTaste(tasteId)
	}

	const handlePrevStep = () => {
		if (step > 1) {
			router.push(`/foodSurvey/${step - 1}`)
		}
	}

	const handleNextStep = () => {
		if (!selectedTaste) return

		if (step < 3) {
			router.push(`/foodSurvey/${step + 1}`)
		} else {
			// 3단계에서는 추천 결과 화면으로 이동
			router.push('/surveyResult')
		}
	}

	return (
		<div className="relative flex flex-1 flex-col">
			{/* 메인 컨텐츠 */}
			<div className="mx-[70px] mb-[100px] flex-1">
				{/* 상단 네비게이션 */}
				<div className="mb-8 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon.ArrowLeft />
						<span className="text-orange">메인 화면으로 돌아가기</span>
					</div>
					<div className="flex gap-2 text-white">
						{[1, 2, 3].map((stepNum) => (
							<div
								key={stepNum}
								className={`flex h-[28px] w-[28px] items-center justify-center rounded-full ${
									stepNum === step ? 'bg-orange' : 'bg-gray-30'
								}`}
							>
								{stepNum}
							</div>
						))}
					</div>
				</div>
				{/* 제목 */}
				<div className="mb-12">
					<h1 className="text-h2-bold mb-4">
						{beforeText}
						<span className="text-orange">{highlightText}</span>
						{afterText}
					</h1>
					<p className="text-h2-bold text-gray-700">{subtitle}</p>
				</div>
				{/* 카드 그리드 */}
				<div className="mb-12 grid w-[70%] grid-cols-3 gap-[24px]">
					{options.map((option, index) =>
						option.id !== 'null' ? (
							<SurveyCard
								key={option.id}
								id={option.id}
								label={option.label}
								sublabel={option.sublabel}
								icon={option.icon}
								isSelected={selectedTaste === option.id}
								onClick={handleSelect}
							/>
						) : (
							<div key={index} />
						),
					)}
				</div>

				<div className="flex-end pointer-events-none absolute right-0 bottom-[120px] z-[-1] inline-flex h-[70%] w-[40%] pt-[39px] pl-[5px]">
					<Image
						src={backgroundImage}
						alt="character"
						fill
						className="h-full w-auto object-contain"
					/>
				</div>
				{/* 네비게이션 버튼 */}
				<div className="flex justify-between">
					{step > 1 && (
						<button
							className="text-orange flex items-center gap-2 font-medium"
							onClick={handlePrevStep}
						>
							<Icon.ArrowLeft className="text-orange" />
							이전단계
						</button>
					)}
					{step === 1 && <div />}
					<button
						className={`flex items-center gap-2 font-medium transition ${
							selectedTaste ? 'text-orange' : 'text-gray-300'
						}`}
						disabled={!selectedTaste}
						onClick={handleNextStep}
					>
						다음단계
						<Icon.ArrowRight className={`${selectedTaste ? 'text-orange' : 'text-gray-30'}`} />
					</button>
				</div>
			</div>
		</div>
	)
}
