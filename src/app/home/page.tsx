'use client'

import Header from '@/shared/components/Header'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
	return (
		<>
			<Header />
			<div className="mx-auto flex h-[calc(100vh-110px)] w-full gap-5 px-20 pb-[100px]">
				<div className="flex flex-1 flex-col gap-5">
					<Link
						className="bg-orange flex flex-1 cursor-pointer flex-col justify-between rounded-[50px]"
						href="/foodSurvey/1"
					>
						<div className="mx-[40px] mt-[64px] flex flex-col">
							<div className="text-h2-bold text-white">나에게 딱맞춤 메뉴 추천 받기</div>
							<div className="text-h3-medium text-white">
								나의 기분과 취향에 맞춰 음식을 추천해줘요
							</div>
						</div>
						<div className="relative mb-4 flex-1">
							<Image
								src="/assets/images/home-personal-babbuddy.webp"
								alt="home-1"
								fill
								className="object-contain object-right-bottom"
							/>
						</div>
					</Link>
					<Link className="bg-gray-5 rounded-[50px] p-[40px]" href="/roulette">
						<div className="text-h2-bold">랜덤으로 빠르게 추천받기</div>
						<div className="text-h3-medium text-gray-50">
							카테고리만 선택해서 무작위 음식을 추천받아요
						</div>
					</Link>
				</div>
				<Link
					className="flex flex-1 cursor-pointer flex-col justify-between rounded-[50px] bg-[#1A1A1A]"
					href="/group"
				>
					<div className="mx-[40px] mt-[64px] flex flex-col">
						<div className="text-h2-bold text-white">다같이 메뉴 정하기</div>
						<div className="text-h3-medium text-white">모두의 취향을 반영해 음식을 정해요</div>
					</div>
					<div className="relative mb-4 flex-1">
						<Image
							src="/assets/images/home_group_babbuddy.webp"
							alt="home-1"
							fill
							className="object-contain object-right-bottom"
						/>
					</div>
				</Link>
			</div>
		</>
	)
}
