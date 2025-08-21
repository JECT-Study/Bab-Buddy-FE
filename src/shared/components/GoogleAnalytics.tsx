'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface GoogleAnalyticsProps {
	gaId: string
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
	const pathname = usePathname()

	useEffect(() => {
		if (typeof window === 'undefined' || !gaId || !window.gtag) return

		// 페이지뷰 이벤트 전송
		window.gtag('config', gaId, {
			page_path: pathname,
		})
	}, [pathname, gaId])

	return null
}
