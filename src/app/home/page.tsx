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
						className="bg-orange relative flex flex-1 cursor-pointer flex-col justify-between overflow-hidden rounded-[50px]"
						href="/foodSurvey/1"
					>
						<div className="relative z-10 mx-[40px] mt-[64px] flex flex-col">
							<div className="text-h2-bold text-white">나에게 딱맞춤 메뉴 추천 받기</div>
							<div className="text-h3-medium text-white">
								나의 기분과 취향에 맞춰 음식을 추천해줘요
							</div>
						</div>
						<div className="relative h-[350px] w-full">
							<div className="absolute right-[-110px] bottom-[-90px] h-[550px] w-[550px]">
								<Image
									src="/assets/images/home-personal-babbuddy.webp"
									alt="home-1"
									fill
									sizes="550px"
									className="rotate-[-15deg] object-contain"
								/>
							</div>
						</div>
					</Link>
					<Link className="bg-gray-5 rounded-[50px] p-[40px]" href="/roulette">
						<div className="text-h2-bold text-gray-100">랜덤으로 빠르게 추천받기</div>
						<div className="text-h3-medium text-gray-50">
							카테고리만 선택해서 무작위 음식을 추천받아요
						</div>
					</Link>
				</div>
				<Link
					className="relative flex flex-1 cursor-pointer flex-col justify-between overflow-hidden rounded-[50px] bg-[#1A1A1A]"
					href="/group"
				>
					<div className="relative z-10 mx-[40px] mt-[64px] flex flex-col">
						<div className="text-h2-bold text-white">다같이 메뉴 정하기</div>
						<div className="text-h3-medium text-white">모두의 취향을 반영해 음식을 정해요</div>
					</div>
					<div className="relative h-[350px] w-full flex-shrink-0">
						<div className="absolute right-0 bottom-0 h-[450px] w-[600px]">
							<Image
								src="/assets/images/home_group_babbuddy.webp"
								alt="home-1"
								fill
								priority
								sizes="600px"
								className="object-contain object-right-bottom"
							/>
						</div>
					</div>
				</Link>
			</div>
		</>
	)
}
