'use client'

import React from 'react'
import Image from 'next/image'
import { RouletteResultModalProps } from '../types/rouletteTypes'

const RouletteResultModal: React.FC<RouletteResultModalProps> = ({
	isOpen,
	result,
	onClose,
	onShare,
}) => {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* 배경 오버레이 */}
			<div className="absolute inset-0 bg-black/50" onClick={onClose} />

			{/* 모달 */}
			<div className="relative flex w-full max-w-md flex-col rounded-3xl bg-white p-12 shadow-2xl">
				{/* 축하 메시지 */}
				<div className="text-h3-bold mb-6 text-center">
					<h2 className="text-gray-80">축하합니다! 🎉</h2>
					<p className="text-gray-80">
						<span className="text-orange font-bold">{result}</span>이(가) 당첨되었어요!
					</p>
				</div>

				{/* 결과 이미지 */}
				<div className="flex justify-center">
					<Image
						src="/assets/icons/random_result.svg"
						alt="룰렛 결과"
						width={208}
						height={200}
						className="w-52 object-contain sm:w-56"
						priority
					/>
				</div>

				{/* 버튼들 */}
				<div className="space-y-3">
					{/* 링크 공유하기 버튼 */}
					<button
						onClick={onShare}
						className="bg-orange text-b2-medium hover:bg-orange/90 flex w-full items-center justify-center gap-2 rounded-[50px] px-8 py-4 text-white transition-colors duration-200"
					>
						<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
						</svg>
						링크 공유하기
					</button>

					{/* 닫기 버튼 */}
					<button
						onClick={onClose}
						className="bg-gray-10 text-b2-medium hover:bg-gray-20 w-full rounded-[50px] px-6 py-3 transition-colors duration-200"
					>
						닫기
					</button>
				</div>
			</div>
		</div>
	)
}

export default RouletteResultModal
