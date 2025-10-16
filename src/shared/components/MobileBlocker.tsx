'use client'

import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import localFont from 'next/font/local'

const logoFont = localFont({
	src: '../../app/fonts/TJJoyofsingingB_TTF.ttf',
	display: 'swap',
})

const MIN_WIDTH = 768

const MOBILE_BLOCK_TEXT_INFO = {
	'mobile-device': {
		title: '밥버디 서비스는 PC로 이용해주세요.',
		description: '모바일에서는 지원하지 않는 전용 웹페이지입니다.',
	},
	'narrow-viewport': {
		title: `화면 넓이 ${MIN_WIDTH}px 이상의 환경에서 이용해주세요.`,
		description: `화면 넓이 ${MIN_WIDTH}px 이하에서는 지원하지 않는 웹페이지입니다.`,
	},
} as const

type BlockReasonType = keyof typeof MOBILE_BLOCK_TEXT_INFO

interface MobileBlockerProps {
	blockReason?: BlockReasonType
}

/**
 * 모바일/좁은 화면 차단 페이지 컴포넌트
 * @description 데스크톱 전용 서비스임을 안내하고 접근을 제한합니다
 * @param blockReason - 차단 사유 ('mobile-device': 모바일 기기 감지, 'narrow-viewport': 화면 너비 부족)
 */
const MobileBlocker = React.memo(
	({ blockReason = 'narrow-viewport' }: MobileBlockerProps) => {
		const { title, description } = MOBILE_BLOCK_TEXT_INFO[blockReason]

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
					<h1 className="text-b1-bold mt-4 shrink-0">{title}</h1>
					<p className="text-b2-medium mt-2 shrink-0 text-gray-50">{description}</p>
				</div>
			</div>
		)
	},
	// blockReason이 변경되지 않으면 리렌더링 방지
	(prevProps, nextProps) => {
		return prevProps.blockReason === nextProps.blockReason
	},
)

MobileBlocker.displayName = 'MobileBlocker'

export default MobileBlocker
