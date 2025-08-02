import type { NextConfig } from 'next'

const config: NextConfig = {
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
