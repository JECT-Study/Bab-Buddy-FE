'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthUtils } from '@/shared/utils/auth'

/**
 * 로그인된 사용자가 접근하면 안 되는 페이지에서 사용하는 훅 (예: 로그인 페이지)
 * 인증된 사용자는 온보딩 페이지로 리다이렉트
 */
export const useGuestOnly = () => {
	const router = useRouter()

	useEffect(() => {
		if (AuthUtils.isAuthenticated()) {
			router.push('/onboarding')
		}
	}, [router])

	return {
		isAuthenticated: AuthUtils.isAuthenticated(),
	}
}
