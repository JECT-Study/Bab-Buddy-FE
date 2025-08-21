import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import ConditionalLayout from '@/shared/components/ConditionalLayout'
import MobileDetector from '@/shared/components/MobileDetector'
import GoogleAnalytics from '@/shared/components/GoogleAnalytics'
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
	const gaId = process.env.NEXT_PUBLIC_GA_ID
	const isProduction = process.env.NODE_ENV === 'production'

	return (
		<html lang="ko" className={pretendard.variable} suppressHydrationWarning>
			<head>
				{/* DataLayer 초기화 - 프로덕션에서만 */}
				{isProduction && (
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
				{/* Google Tag Manager - 프로덕션에서만 로드 */}
				{gtmId && isProduction && (
					<>
						<noscript>
							<iframe
								src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
								height="0"
								width="0"
								style={{ display: 'none', visibility: 'hidden' }}
							/>
						</noscript>
						<Script
							src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
							strategy="afterInteractive"
						/>
					</>
				)}

				{/* Google Analytics - 프로덕션에서만 로드 */}
				{gaId && isProduction && (
					<>
						<Script
							strategy="afterInteractive"
							src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
						/>
						<Script
							id="gtag-init"
							strategy="afterInteractive"
							dangerouslySetInnerHTML={{
								__html: `
									window.dataLayer = window.dataLayer || [];
									function gtag(){dataLayer.push(arguments);}
									gtag('js', new Date());
									gtag('config', '${gaId}', {
										send_page_view: true,
										debug_mode: false
									});
								`,
							}}
						/>
					</>
				)}

				{/* Kakao SDK */}
				<Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="afterInteractive" />

				<MobileDetector />
				{gaId && isProduction && <GoogleAnalytics gaId={gaId} />}
				<ConditionalLayout>{children}</ConditionalLayout>
			</body>
		</html>
	)
}
