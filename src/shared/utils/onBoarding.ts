import type { useRouter } from 'next/navigation'
import { checkOnboardingStatus } from '@/features/myInfo/api/user'
type AppRouter = ReturnType<typeof useRouter>

export const redirectToOnboarding = async (router: AppRouter) => {
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
