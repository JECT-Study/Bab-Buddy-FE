import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'img1.kakaocdn.net',
      },
      {
        hostname: 't1.kakaocdn.net',
      },
      {
        hostname: 'k.kakaocdn.net',
      },
      {
        hostname: '*.blob.core.windows.net',
      },
    ],
  },
}

export default config