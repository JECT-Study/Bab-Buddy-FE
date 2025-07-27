'use client'

import React from 'react'
import Image from 'next/image'
import Icon from '@/shared/components/Icon'
import { useRouter } from 'next/navigation'

export const SurveyResult: React.FC = () => {
	// 실제로는 API나 상태 관리를 통해 데이터를 가져와야 합니다.
	const mockData = {
		userName: '홍길동',
		recommendedMenu: '김치찌개',
		recommendationReason:
			'집밥과 한식당을 좋아하시고 생선은 피하고 싶은 당신을 위해 오늘은 김치찌개를 추천드려요 😊',
		backgroundImage: '/assets/images/kimchi-stew.jpg',
		restaurants: [
			{
				id: 1,
				name: '삼겹 담은 김치찌개 전문점 논현점',
				type: '한식',
				distance: '300m',
				isBookmarked: true,
			},
			{
				id: 2,
				name: '삼겹 담은 김치찌개 전문점 논현점',
				type: '한식',
				distance: '300m',
				isBookmarked: false,
			},
			{
				id: 3,
				name: '삼겹 담은 김치찌개 전문점 논현점',
				type: '한식',
				distance: '300m',
				isBookmarked: false,
			},
		],
	}
	const router = useRouter()

	const handleRetry = () => {
		router.push('/foodSurvey/1')
	}

	const handleShare = () => {
		// 공유 기능 구현
	}

	return (
		<div className="flex flex-col gap-8 pr-[50px] pb-[73px] pl-[90px]">
			{/* 상단 추천 결과 카드 */}
			<div className="flex items-center gap-[36px] rounded-[24px] bg-[#F6F6F6] p-[36px]">
				<div className="relative h-[300px] w-[600px]">
					<Image
						src={mockData.backgroundImage}
						alt="추천 음식 이미지"
						fill
						className="rounded-[24px] object-cover"
					/>
				</div>
				<div className="flex flex-1 flex-col">
					<div className="mb-6 flex flex-col gap-4 rounded-[24px] bg-white p-6">
						<div className="flex flex-col gap-1">
							<h2 className="text-[32px] leading-[42px] font-medium tracking-[-0.04em]">
								{mockData.userName}님께 딱맞춘 오늘의 메뉴
							</h2>
							<h1 className="text-[40px] leading-[50px] font-bold tracking-[-0.04em]">
								{mockData.recommendedMenu}
							</h1>
						</div>
						<p className="text-[18px] leading-[27px] font-medium tracking-[-0.02em] text-[#777677]">
							{mockData.recommendationReason}
						</p>
					</div>
					<div className="flex justify-end gap-[16px]">
						<button
							onClick={handleRetry}
							className="flex items-center gap-2 rounded-[30px] bg-black px-6 py-4 font-medium text-white"
						>
							다시 추천 받기
						</button>
						<button
							onClick={handleShare}
							className="flex items-center gap-2 rounded-[30px] bg-[#EA580C] px-6 py-4 font-medium text-white"
						>
							<Icon.Share className="h-[18px] w-[18px]" />
							링크 공유하기
						</button>
					</div>
				</div>
			</div>

			{/* 주변 식당 추천 섹션 */}
			<div className="flex flex-col gap-6">
				<h2 className="text-[24px] leading-[35px] font-bold tracking-[-0.04em]">
					내 주변 가장 가까운 식당 추천
				</h2>
				<div className="flex gap-6">
					<div className="flex w-[640px] flex-col gap-6">
						{mockData.restaurants.map((restaurant) => (
							<div
								key={restaurant.id}
								className="flex items-center justify-between rounded-[24px] border border-[#E0E0E0] p-6"
							>
								<div className="flex items-center gap-8">
									<span className="text-[32px] leading-[42px] font-bold tracking-[-0.04em]">
										{restaurant.id}
									</span>
									<div className="flex flex-col gap-2">
										<div className="flex items-center gap-2">
											<span className="text-[16px] leading-[24px] font-medium tracking-[-0.02em]">
												{restaurant.name}
											</span>
											<span className="rounded-[20px] bg-[#EA580C] px-[10px] py-[1px] text-[16px] leading-[24px] font-medium tracking-[-0.02em] text-white">
												{restaurant.type}
											</span>
										</div>
										<div className="flex items-center gap-1">
											<Icon.Location className="h-3 w-3 text-[#777677]" />
											<span className="text-[15px] leading-[23px] font-medium tracking-[-0.02em] text-[#777677]">
												{restaurant.distance}
											</span>
										</div>
										<div className="flex items-center gap-2 text-[16px] leading-[24px] font-medium tracking-[-0.02em] text-[#777677]">
											자세히보기
											<Icon.ArrowRight className="text-[#777677]" size={16} />
										</div>
									</div>
								</div>
								<button>
									<Icon.Bookmark
										className={`h-[45px] w-[45px] ${
											restaurant.isBookmarked ? 'text-[#FDDC3F]' : 'text-[#AEAEAE]'
										}`}
									/>
								</button>
							</div>
						))}
					</div>
					<div className="relative flex-1 rounded-[24px] bg-[url('/assets/images/map.png')] bg-cover">
						{/* 지도 마커 */}
					</div>
				</div>
			</div>
		</div>
	)
}
