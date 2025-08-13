import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import MobileLayoutWrapper from '@/shared/components/MobileLayoutWrapper'
import MobileDetector from '@/shared/components/MobileDetector'

const pretendard = localFont({
	src: './fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '45 920',
	variable: '--font-pretendard',
})

export const metadata: Metadata = {
	title: 'BabBuddy',
	description: '메뉴 추천 서비스',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ko" className={pretendard.variable}>
			<body className="font-pretendard min-h-screen">
				<MobileDetector />
				<MobileLayoutWrapper>{children}</MobileLayoutWrapper>
				<script src="https://developers.kakao.com/sdk/js/kakao.js" async />
			</body>
		</html>
	)
}
