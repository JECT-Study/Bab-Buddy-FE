'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Icon from '@/shared/components/Icon'
import { useRouter } from 'next/navigation'

interface RecommendationCardProps {
	userName: string
	recommendedMenu: string
	recommendationReason: string
	backgroundImage: string
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
	userName,
	recommendedMenu,
	recommendationReason,
	backgroundImage,
}) => {
	const router = useRouter()
	const [imgSrc, setImgSrc] = useState(backgroundImage)

	const onRetry = () => {
		router.push('/foodSurvey/1')
	}
	const onShare = () => {
		console.log('share')
	}
	return (
		<div className="flex items-center gap-[36px] rounded-[24px] bg-[#F6F6F6] p-[36px]">
			<div className="h-[300px] w-[600px] overflow-hidden">
				{imgSrc && (
					<Image
						src={imgSrc}
						alt="추천 음식 이미지"
						width={600}
						height={300}
						className="h-[300px] w-full rounded-[24px] object-cover"
						loading="eager"
						priority
						unoptimized
					/>
				)}
			</div>
			<div className="flex flex-1 flex-col">
				<div className="mb-6 flex flex-col gap-4 rounded-[24px] bg-white p-6">
					<div className="flex flex-col gap-1">
						<h2 className="text-[32px] leading-[42px] font-medium tracking-[-0.04em]">
							{userName}님께 딱맞춘 오늘의 메뉴
						</h2>
						<h1 className="text-[40px] leading-[50px] font-bold tracking-[-0.04em]">
							{recommendedMenu}
						</h1>
					</div>
					<p className="text-[18px] leading-[27px] font-medium tracking-[-0.02em] text-[#777677]">
						{recommendationReason}
					</p>
				</div>
				<div className="flex justify-end gap-[16px]">
					<button
						onClick={onRetry}
						className="flex items-center gap-2 rounded-[30px] bg-black px-6 py-4 font-medium text-white"
					>
						다시 추천 받기
					</button>
					<button
						onClick={onShare}
						className="flex items-center gap-2 rounded-[30px] bg-[#EA580C] px-6 py-4 font-medium text-white"
					>
						<Icon.Share className="h-[18px] w-[18px]" />
						링크 공유하기
					</button>
				</div>
			</div>
		</div>
	)
}
