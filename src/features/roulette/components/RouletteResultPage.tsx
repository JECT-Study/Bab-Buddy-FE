'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import RouletteResultModal from './RouletteResultModal'
import RouletteSpinner from './RouletteSpinner'
import { RouletteResult } from '../types/rouletteTypes'
import { generateShareUrl, copyToClipboard } from '../utils/rouletteUtils'
import { useRoulette } from '../hooks/useRoulette'

const RouletteResultPage = () => {
	const params = useParams()
	const resultId = params.id as string
	const [result, setResult] = useState<RouletteResult | null>(null)
	const [showResultModal, setShowResultModal] = useState(false)
	const { generateRouletteResult } = useRoulette()

	useEffect(() => {
		// URL에서 음식 이름 확인
		const urlParams = new URLSearchParams(window.location.search)
		const foodName = urlParams.get('food')

		// 3초 후 결과 생성
		setTimeout(() => {
			const finalResult = generateRouletteResult(foodName)
			setResult(finalResult)

			// 결과 모달 표시
			setTimeout(() => {
				setShowResultModal(true)
			}, 500)
		}, 3000)
	}, [resultId, generateRouletteResult])

	const handleShare = async () => {
		if (!result) return

		const shareUrl = generateShareUrl(resultId, result.result)
		const success = await copyToClipboard(shareUrl)

		if (success) {
			alert('링크가 클립보드에 복사되었습니다!')
		} else {
			// 클립보드 복사 실패 시 URL을 표시
			alert(`공유할 링크: ${shareUrl}`)
		}
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
