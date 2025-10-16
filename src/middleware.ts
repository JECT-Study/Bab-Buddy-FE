import { type NextRequest, NextResponse, userAgent } from 'next/server'

export function middleware(request: NextRequest) {
	const url = request.nextUrl
	const { device } = userAgent(request)

	// device.type can be: 'mobile', 'tablet', 'console', 'smarttv',
	// 'wearable', 'embedded', or undefined (for desktop browsers)
	const isDesktop = device.type === undefined

	// ✅ 정적 파일 요청은 모두 통과 (확장자 있는 파일)
	if (/\.\w+$/.test(url.pathname)) {
		return NextResponse.next()
	}

	// ✅ Accept 헤더로 이미지/정적 리소스 요청 감지
	const accept = request.headers.get('accept')
	if (accept && !accept.includes('text/html')) {
		// 이미지, CSS, JS, 폰트 등의 요청
		return NextResponse.next()
	}

	// 이미 /mobile-block 경로인 경우
	if (url.pathname === '/mobile-block') {
		// 데스크톱이면 /home으로 redirect
		if (isDesktop) {
			return NextResponse.redirect(new URL('/home', request.url))
		}
		// 모바일이면 통과(모바일 블럭 페이지 유지)
		return NextResponse.next()
	}

	// 데스크톱이 아니면 /mobile-block으로 rewrite
	if (!isDesktop) {
		return NextResponse.rewrite(new URL('/mobile-block', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!_next/static|_next/image|favicon.ico|api|assets/).*)',
	],
}
