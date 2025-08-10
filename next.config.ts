import type { NextConfig } from 'next'

const config: NextConfig = {
	experimental: {
		// 동적 라우트 최적화
		optimizePackageImports: ['@/features'],
	},
	// 동적 라우트 처리 최적화
	async rewrites() {
		return [
			{
				source: '/foodSurvey/:step',
				destination: '/foodSurvey/[step]',
			},
			{
				source: '/surveyResult/:id',
				destination: '/surveyResult/[id]',
			},
		]
	},
	images: {
		domains: ['img1.kakaocdn.net', 't1.kakaocdn.net'], // Add img1.kakaocdn.net and any other necessary domains
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
}

export default config
