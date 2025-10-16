'use client'

import React, { useState, useEffect } from 'react'
import Icon from '@/shared/components/Icon'
import SurveyCard from '@/features/foodSurvey/components/SurveyCard'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { FoodSurveyProps } from '@/features/foodSurvey/types/foodSurveyTypes'
import { useFoodSurveyStore } from '@/features/foodSurvey/store/foodSurveyStore'
import type { SurveyStep } from '@/features/foodSurvey/store/foodSurveyStore'
import type { SurveyResponse } from '@/features/surveyResult/types/surveyResultTypes'
import { LocationPermissionModal } from './LocationPermissionModal'
import { useLocation } from '../hooks/useLocation'

export const FoodSurvey: React.FC<FoodSurveyProps> = ({
	step,
	beforeText,
	highlightText,
	afterText,
	subtitle,
	backgroundImage,
	options,
}) => {
	const router = useRouter()
	const { surveyResponses, setResponse } = useFoodSurveyStore()
	const [selectedTaste, setSelectedTaste] = useState<string | null>(null)
	const {
		hasRequestedPermission,
		showLocationModal,
		setShowLocationModal,
		checkLocationPermission,
		handleDenyLocation,
		handleAcceptLocation,
	} = useLocation()
	// Load saved response for current step
	useEffect(() => {
		const currentResponse = surveyResponses[`survey${step}` as keyof SurveyResponse]
		if (currentResponse) {
			setSelectedTaste(currentResponse)
		}
	}, [step, surveyResponses])

	// Check if we should show location permission modal
	useEffect(() => {
		// 첫 번째 단계에서만 모달 표시
		if (step === 1) {
			checkLocationPermission()
			// 이미 주소가 있거나 권한 요청을 한 적이 있으면 표시하지 않음
			if (surveyResponses.address || hasRequestedPermission) {
				return
			}
			// 약간의 딜레이를 주어 자연스럽게 표시
			const timer = setTimeout(() => {
				setShowLocationModal(true)
			}, 800)
			return () => clearTimeout(timer)
		} else {
			if (surveyResponses.address || hasRequestedPermission) {
				return
			}
			router.push('/foodSurvey/1')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleSelect = (tasteId: string) => {
		setSelectedTaste(tasteId)
		handleNextStep(tasteId)
		setResponse(step as SurveyStep, tasteId)
	}

	const handlePrevStep = () => {
		if (step > 1) {
			router.push(`/foodSurvey/${step - 1}`)
		}
	}

	const handleNextStep = async (tasteId: string) => {
		if (!tasteId) return

		if (step < 3) {
			router.push(`/foodSurvey/${step + 1}`)
		} else {
			router.push('/surveyResult')
		}
	}

	return (
		<div className="relative flex flex-1 flex-col">
			{/* 위치 권한 안내 모달 */}
			<LocationPermissionModal
				isOpen={showLocationModal}
				onAccept={handleAcceptLocation}
				onDeny={handleDenyLocation}
			/>

			<div className="pointer-events-none absolute right-0 bottom-0 z-[-1] h-full w-[40%]">
				<div className="relative h-full w-full">
					<Image
						src={backgroundImage}
						alt="character"
						fill
						sizes="592px"
						className="object-contain object-right-bottom"
					/>
				</div>
			</div>

			{/* 메인 컨텐츠 영역 */}
			<div className="mx-[70px] mb-[100px] flex-1">
				{/* 상단 네비게이션 */}
				<div className="mb-8 flex items-center">
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
					<div className="text-h2-bold mb-4">
						{beforeText}
						<span className="text-orange">{highlightText}</span>
						{afterText}
					</div>
					<div className="text-h2-bold">{subtitle}</div>
				</div>

				{/* 카드 그리드 */}
				<div className="grid-cols-auto-fit mb-12 grid w-[70%] grid-cols-3 gap-[24px]">
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

				{/* 네비게이션 버튼 */}
				<div className="text-h3-midium flex justify-between">
					{step > 1 && (
						<button
							className="text-orange flex items-center gap-2 font-medium"
							onClick={handlePrevStep}
						>
							<Icon.ArrowLeft className="text-orange" />
							이전단계
						</button>
					)}
					{step === 1 && (
						<button
							className="text-orange item-center flex gap-2 font-medium"
							onClick={() => router.push('/home')}
						>
							<Icon.ArrowLeft className="text-orange" />
							메인화면으로 돌아가기
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
