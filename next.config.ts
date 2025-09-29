import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      // protocol 생략하면 http, https 둘 다 자동 허용
      {
        hostname: 'img1.kakaocdn.net',
      },
      {
        hostname: 't1.kakaocdn.net',
      },
      {
        hostname: 'k.kakaocdn.net',
      },
      // OpenAI는 https만
      {
        protocol: 'https',
        hostname: '*.blob.core.windows.net',
      },
    ],
  },
}

export default config