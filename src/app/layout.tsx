import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import ConditionalLayout from '@/shared/components/ConditionalLayout'
import MobileDetector from '@/shared/components/MobileDetector'
import Script from 'next/script'

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
	const gtmId = process.env.NEXT_PUBLIC_GTM_ID

	return (
		<html lang="ko" className={pretendard.variable} suppressHydrationWarning>
			<head>
				{/* DataLayer 초기화 */}
				{gtmId && (
					<Script
						id="gtm-datalayer"
						strategy="beforeInteractive"
						dangerouslySetInnerHTML={{
							__html: `window.dataLayer = window.dataLayer || [];`,
						}}
					/>
				)}
			</head>
			<body className="font-pretendard min-h-screen">
				{/* Google Tag Manager (noscript) */}
				{gtmId && (
					<noscript>
						<iframe
							src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
							height="0"
							width="0"
							style={{ display: 'none', visibility: 'hidden' }}
						/>
					</noscript>
				)}

				{/* GTM 외부 스크립트 로드 */}
				{gtmId && (
					<Script
						src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
						strategy="afterInteractive"
					/>
				)}

				<MobileDetector />
				<ConditionalLayout>{children}</ConditionalLayout>
				<script src="https://developers.kakao.com/sdk/js/kakao.js" async />
			</body>
		</html>
	)
}
