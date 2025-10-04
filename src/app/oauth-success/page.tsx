'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthUtils } from '@/shared/utils/auth'
import { checkOnboardingStatus } from '@/features/myInfo/api/user'

const OAuthSuccessPage = () => {
	const router = useRouter()
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const handleOAuthSuccess = async () => {
			try {
				// URL에서 accessToken 추출
				const accessToken = AuthUtils.parseTokenFromUrl()

				if (!accessToken) {
					setError('액세스 토큰을 찾을 수 없습니다.')
					return
				}

				// 토큰 저장
				AuthUtils.handleOAuthSuccess(accessToken)

				// onboarding-status 확인
				const isOnboardingCompleted = await checkOnboardingStatus()

				// 응답값에 따라 적절한 페이지로 리다이렉트
				if (isOnboardingCompleted) {
					router.push('/home')
				} else {
					router.push('/onboarding')
				}
			} catch {
				setError('로그인 처리 중 오류가 발생했습니다.')
			}
		}

		handleOAuthSuccess()
	}, [router])

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-white">
				<div className="text-center">
					<h1 className="text-h2-bold mb-2 text-red-500">오류 발생</h1>
					<p className="text-b2-medium mb-4 text-gray-50">{error}</p>
					<button
						onClick={() => router.push('/login')}
						className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
					>
						로그인 페이지로 돌아가기
					</button>
				</div>
			</div>
		)
	}

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
