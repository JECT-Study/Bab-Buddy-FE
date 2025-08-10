'use client'

import React, { useState, useEffect } from 'react'
import Icon from '@/shared/components/Icon'
import SurveyCard from '@/features/foodSurvey/components/SurveyCard'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { FoodSurveyProps } from '@/features/foodSurvey/types/foodSurveyTypes'
import { getAddressFromCoords } from '@/features/foodSurvey/api/addressApi'
import { useFoodSurveyStore } from '@/features/foodSurvey/store/foodSurveyStore'
import type { SurveyStep } from '@/features/foodSurvey/store/foodSurveyStore'
import type { SurveyResponse } from '@/features/surveyResult/types/surveyResultTypes'
import { useLocationStore } from '@/shared/store/locationStore'
import { completeOnboarding } from '@/features/myInfo/api/user'

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
	const { surveyResponses, setResponse, setAddress } = useFoodSurveyStore()
	const { setLocation } = useLocationStore()
	const [selectedTaste, setSelectedTaste] = useState<string | null>(null)

	// Load saved response for current step
	useEffect(() => {
		const currentResponse = surveyResponses[`survey${step}` as keyof SurveyResponse]
		if (currentResponse) {
			setSelectedTaste(currentResponse)
		}
	}, [step, surveyResponses])

	// Get user's location and address
	useEffect(() => {
		const getAddress = async () => {
			if (!navigator.geolocation) {
				console.error('Geolocation is not supported by this browser.')
				return
			}

			try {
				const position = await new Promise<GeolocationPosition>((resolve, reject) => {
					navigator.geolocation.getCurrentPosition(resolve, reject, {
						enableHighAccuracy: true,
						timeout: 5000,
						maximumAge: 0,
					})
				})

				const { latitude, longitude } = position.coords
				setLocation({ lat: latitude, lng: longitude })
				const response = await getAddressFromCoords(latitude, longitude)
				if (response.address) {
					setAddress(response.address)
				}
			} catch (error) {
				console.error('Error in getAddress:', error)
			}
		}

		if (!surveyResponses.address) {
			getAddress()
		}
	}, [setAddress, surveyResponses.address, setLocation])

	const handleSelect = (tasteId: string) => {
		setSelectedTaste(tasteId)
		setResponse(step as SurveyStep, tasteId)
	}

	const handlePrevStep = () => {
		if (step > 1) {
			router.push(`/foodSurvey/${step - 1}`)
		}
	}

	const handleNextStep = async () => {
		if (!selectedTaste) return

		if (step < 3) {
			router.push(`/foodSurvey/${step + 1}`)
		} else {
			try {
				// 마지막 단계에서 온보딩 완료 처리
				await completeOnboarding()
				console.log('✅ 온보딩 완료: /surveyResult으로 이동')
				router.push('/surveyResult')
			} catch (error) {
				console.error('❌ 온보딩 완료 처리 실패:', error)
				// 에러 발생 시에도 결과 페이지로 이동 (사용자 경험을 위해)
				router.push('/surveyResult')
			}
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
