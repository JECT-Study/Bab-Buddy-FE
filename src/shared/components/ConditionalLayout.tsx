'use client'

import { useMobileStore } from '@/shared/store/mobileStore'
import MobileBlocker from './MobileBlocker'

interface ConditionalLayoutProps {
	children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
	const { isMobile } = useMobileStore()

	// 모바일일 때는 MobileBlocker만 렌더링
	if (isMobile) {
		return <MobileBlocker />
	}

	// PC일 때는 children 렌더링
	return <>{children}</>
}
