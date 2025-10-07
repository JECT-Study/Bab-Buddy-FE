import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { checkOnboardingStatus } from '@/features/myInfo/api/user'

export const redirectToOnboarding = async (router: AppRouterInstance) => {
	try {
		const isOnboardingCompleted = await checkOnboardingStatus()

		if (isOnboardingCompleted) {
			router.push('/home')
		} else {
			router.push('/onboarding')
		}
	} catch (error) {
		console.error('Onboarding status check failed:', error)
		// 에러 시 기본 동작 (예: 온보딩으로 이동)
		router.push('/onboarding')
	}
}
