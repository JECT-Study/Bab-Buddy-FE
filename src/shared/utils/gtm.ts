'use client'

// GTM에서 허용되는 값 타입
type GTMValue = string | number | boolean | null | undefined

// GTM DataLayer 아이템 타입
export interface GTMDataLayerItem {
	'gtm.start'?: number
	event?: string
	[key: string]: GTMValue
}

declare global {
	interface Window {
		dataLayer: GTMDataLayerItem[]
		gtag?: (...args: unknown[]) => void
	}
}

// 개발 환경 감지 함수
const isLocalDevelopment = (): boolean => {
	if (typeof window === 'undefined') return false

	return (
		window.location.hostname === 'localhost' ||
		window.location.hostname === '127.0.0.1' ||
		window.location.hostname.includes('.local')
	)
}

// 프로덕션 환경 감지 함수
const isProduction = (): boolean => {
	return process.env.NODE_ENV === 'production'
}

// 개발 환경에서 로그를 출력하는 헬퍼 함수
const logDevMessage = (service: 'GTM' | 'GA', action: string, data?: unknown): void => {
	console.log(`%c[${service} DEV] ${action}`, 'color: #888;', data || '')
}

// GTM이 로드되었는지 확인하는 함수
const isGTMLoaded = (): boolean => {
	return (
		typeof window !== 'undefined' && Array.isArray(window.dataLayer) && window.dataLayer.length > 0
	)
}

// GTM 로드를 기다리는 함수
const waitForGTM = (timeout = 5000): Promise<boolean> => {
	return new Promise((resolve) => {
		if (isGTMLoaded()) {
			resolve(true)
			return
		}

		const startTime = Date.now()
		const checkInterval = setInterval(() => {
			if (isGTMLoaded()) {
				clearInterval(checkInterval)
				resolve(true)
			} else if (Date.now() - startTime > timeout) {
				clearInterval(checkInterval)
				resolve(false)
			}
		}, 100)
	})
}

// GTM 이벤트 트래킹 함수
const trackEvent = async (
	eventName: string,
	parameters: Record<string, GTMValue> = {},
): Promise<void> => {
	if (typeof window === 'undefined') return

	// 개발 환경에서는 로그만 출력하고 실제 트래킹하지 않음
	if (isLocalDevelopment()) {
		logDevMessage('GTM', `이벤트 트래킹 비활성화: ${eventName}`, parameters)
		return
	}

	// 프로덕션에서만 실제 트래킹
	if (!isProduction()) return

	const isLoaded = await waitForGTM()
	if (isLoaded && window.dataLayer) {
		window.dataLayer.push({
			event: eventName,
			...parameters,
		})
	}
}

export { trackEvent }
