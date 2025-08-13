'use client'

import { useEffect } from 'react'
import { useMobileStore } from '@/shared/store/mobileStore'

export default function MobileDetector() {
	const { setIsMobile } = useMobileStore()

	useEffect(() => {
		// 초기 체크
		const checkMobile = () => {
			const isMobile = window.innerWidth <= 768
			setIsMobile(isMobile)
		}

		// 초기 실행
		checkMobile()

		// 리사이즈 이벤트 리스너
		const handleResize = () => {
			checkMobile()
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [setIsMobile])

	// 이 컴포넌트는 UI를 렌더링하지 않음
	return null
}
