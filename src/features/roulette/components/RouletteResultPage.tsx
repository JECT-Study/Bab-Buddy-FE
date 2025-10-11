'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import RouletteResultModal from './RouletteResultModal'
import RouletteSpinner from './RouletteSpinner'
import type { RouletteResult, FoodCategory } from '../types/rouletteTypes'
import { generateRouletteResult, generateShareUrl } from '../utils/rouletteUtils'
import { useShareActions } from '@/shared/hooks/useShareActions'
import { useSearchParams } from 'next/navigation'

const RouletteResultPage = () => {
	const params = useParams()
	const resultId = params.id as string
	const [result, setResult] = useState<RouletteResult | null>(null)
	const [showResultModal, setShowResultModal] = useState(false)
	const searchParams = useSearchParams()
	const foodName = searchParams.get('food')
	const category = (searchParams.get('category') as FoodCategory) || 'all'

	useEffect(() => {
		let timer1: ReturnType<typeof setTimeout>
		let timer2: ReturnType<typeof setTimeout> | undefined

		timer1 = setTimeout(() => {
			const finalResult = generateRouletteResult(category, foodName)
			setResult(finalResult)

			timer2 = setTimeout(() => {
				setShowResultModal(true)
			}, 500)
		}, 3000)

		return () => {
			clearTimeout(timer1)
			clearTimeout(timer2)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resultId])

	const shareUrl = result ? generateShareUrl(resultId, result.result, category) : ''
	const { handleLinkShare } = useShareActions(
		'룰렛 결과',
		result ? `${result.result} 메뉴가 나왔어요!` : '',
		'',
		shareUrl,
	)

	// 일반 함수에서는 Hook에서 받은 함수만 사용
	const handleShare = async () => {
		if (!result) return
		await handleLinkShare()
	}

	const handleCloseModal = () => {
		setShowResultModal(false)
	}

	return (
		<>
			<div className="mx-30 flex max-w-full flex-col items-start gap-2.5 rounded-[28px] bg-white px-[174px] py-11">
				<div className="space-between mx-auto flex flex-col justify-center gap-[24px] rounded-[28px] bg-white px-6 py-12">
					{/* 대기 메시지 */}
					<div className="text-center">
						<div className="text-h2-bold text-gray-80 mb-3 whitespace-pre-line">
							{`두근두근 어떤 메뉴가 나올까요? \n 잠시만 기다려주세요. `}
						</div>
					</div>

					{/* 룰렛 스피너 */}
					<RouletteSpinner />
				</div>
			</div>

			{/* 결과 모달 */}
			{result && (
				<RouletteResultModal
					isOpen={showResultModal}
					result={result.result}
					onClose={handleCloseModal}
					onShare={handleShare}
				/>
			)}
		</>
	)
}

export default RouletteResultPage
