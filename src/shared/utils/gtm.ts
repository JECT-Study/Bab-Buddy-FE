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

export const trackEvent = (eventName: string, parameters: Record<string, GTMValue> = {}) => {
	if (typeof window !== 'undefined' && window.dataLayer) {
		window.dataLayer.push({
			event: eventName,
			...parameters,
		})
	}
}
