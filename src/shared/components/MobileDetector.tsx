'use client'

import { useEffect } from 'react'
import { useMobileStore } from '@/shared/store/mobileStore'

export default function MobileDetector() {
	const { setIsMobile } = useMobileStore()

	/** coarse 포인터(터치) 입력 장치가 있는지 감지 (모바일/태블릿) */
	const hasCoarsePointer = () => {
		if (typeof window === 'undefined') return false
		// any-pointer: coarse - 입력 장치(포인터)의 정밀도를 검사.(하드웨어 특성을 반영하므로 “터치 가능한 노트북”도 구분 가능.)
		return window.matchMedia('(any-pointer: coarse)').matches
	}

	/** 터치 입력을 지원하는지 감지 (터치스크린 여부) */
	const hasTouch = () => {
		if (typeof window === 'undefined') return false
		// maxTouchPoints: 브라우저가 인식하는 “터치 포인트 개수”(손가락 개수 등)를 반환하는 속성.
		if ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) return true
		// ontouchstart: 브라우저 전역 객체(window)가 ontouchstart 이벤트를 지원하는지 확인.(모바일은 지원, 데스크탑은 지원 안함)
		if ('ontouchstart' in window) return true
		return false
	}

	useEffect(() => {
		// 초기 체크
		const mqSmall = window.matchMedia('(max-width: 768px)')
		const mqHoverNone = window.matchMedia('(hover: none)')

		const checkMobile = () => {
			const isMobile = window.innerWidth <= 768
			const small = mqSmall.matches
			const coarse = hasCoarsePointer()
			const touch = hasTouch()
			// 간단 휴리스틱: 화면이 작고, 터치 또는 hover 불가이면 모바일 UI
			const clientGuess = small && (coarse || touch || mqHoverNone.matches)

			setIsMobile(isMobile && clientGuess)
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

MobileDetector.displayName = 'MobileDetector'
