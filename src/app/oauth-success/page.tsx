'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthUtils } from '@/shared/utils/auth'

const OAuthSuccessPage = () => {
	const router = useRouter()

	useEffect(() => {
		// URL에서 accessToken 추출
		const accessToken = AuthUtils.parseTokenFromUrl()

		if (accessToken) {
			// 토큰 저장 및 홈으로 리다이렉트
			AuthUtils.handleOAuthSuccess(accessToken, '/allergySurvey')
		} else {
			// 토큰이 없으면 로그인 페이지로 이동
			console.error('❌ accessToken 없음')
			router.push('/login')
		}
	}, [router])

	return (
		<div className="flex min-h-screen items-center justify-center bg-white">
			<div className="text-center">
				<div className="mb-4">
					<div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
				</div>
				<h1 className="text-h2-bold text-gray-90 mb-2">로그인 처리 중입니다...</h1>
				<p className="text-b2-medium text-gray-50">
					잠시만 기다려주세요. 로그인 정보를 확인하고 있습니다.
				</p>
			</div>
		</div>
	)
}

export default OAuthSuccessPage
