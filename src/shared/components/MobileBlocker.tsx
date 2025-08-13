'use client'

import Image from 'next/image'
import clsx from 'clsx'
import localFont from 'next/font/local'

const logoFont = localFont({
	src: '../../app/fonts/TJJoyofsingingB_TTF.ttf',
	display: 'swap',
})

export default function MobileBlocker() {
	return (
		<div className="fixed inset-0 z-50 flex h-screen flex-col bg-white">
			<div className="flex h-14 shrink-0 items-center px-4">
				<div className="flex items-center gap-1">
					<Image src="/assets/icons/logo.svg" alt="로고" width={24} height={24} />
					<strong className={clsx(logoFont.className, 'text-orange text-2xl font-bold')}>
						밥버디
					</strong>
				</div>
			</div>
			<div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 text-center">
				<div className="w-full max-w-[240px] shrink-0">
					<Image
						src="/assets/images/mobile-block.webp"
						alt="PC 이용 권장"
						width={240}
						height={240}
						priority
						className="h-auto w-full"
					/>
				</div>
				<h1 className="text-b1-bold mt-4 shrink-0">밥버디 서비스는 PC로 이용해주세요.</h1>
				<p className="text-b2-medium mt-2 shrink-0 text-gray-50">
					모바일에서는 지원하지 않는 전용 웹페이지입니다.
				</p>
			</div>
		</div>
	)
}
