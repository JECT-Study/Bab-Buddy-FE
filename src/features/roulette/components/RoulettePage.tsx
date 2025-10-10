'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import FoodCategorySelector from './FoodCategorySelector'
import { FoodCategory } from '../types/rouletteTypes'
import { generateResultId } from '../utils/rouletteUtils'
import Image from 'next/image'

const RoulettePage = () => {
	const router = useRouter()
	const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('all')

	const handleSpin = () => {
		// 고유한 결과 ID 생성
		const newResultId = generateResultId()

		// 선택된 카테고리를 URL 파라미터로 전달
		const categoryParam =
			selectedCategory !== 'all' ? `?category=${encodeURIComponent(selectedCategory)}` : ''

		// 결과 페이지로 이동
		router.push(`/roulette/result/${newResultId}${categoryParam}`)
	}

	return (
		<div className="mx-30 flex max-w-full flex-col items-start gap-2.5 rounded-[28px] bg-white px-[174px] py-11">
			{/* 제목 섹션 */}
			<div className="flex w-full flex-col gap-[16px] text-center">
				<div className="text-h2-bold text-gray-100">랜덤으로 메뉴 정하기</div>
				<div className="text-b2-medium text-gray-30">
					선택한 음식 종류와 상황별로 오늘의 메뉴 바로 추천받기
				</div>
			</div>

			<div className="relative mx-auto h-[min(32vh,360px)] w-full max-w-lg">
				<Image
					src="/assets/icons/roullet.svg"
					alt="룰렛 이미지"
					fill
					sizes="(max-width: 1280px) 100vw, 360px"
					className="object-contain"
					priority
				/>
			</div>

			{/* 음식 카테고리 선택 */}
			<div className="flex w-full flex-col gap-[20px]">
				<FoodCategorySelector
					selectedCategory={selectedCategory}
					onCategoryChange={setSelectedCategory}
				/>
				{/* 룰렛 돌리기 버튼 */}
				<button
					onClick={handleSpin}
					className="text-b2-medium hover:bg-orange bg-gray-5 w-full flex-1 rounded-[32px] px-8 py-4 text-gray-50 hover:text-white"
				>
					룰렛 돌리기
				</button>
			</div>
		</div>
	)
}

export default RoulettePage
