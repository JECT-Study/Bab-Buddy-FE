'use server'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams } = new URL(request.url)
	const targetUrl = searchParams.get('url')
	if (!targetUrl) {
		return new NextResponse('Missing url', { status: 400 })
	}

	try {
		const parsed = new URL(targetUrl)
		if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
			return new NextResponse('Invalid protocol', { status: 400 })
		}

		// Fetch without forwarding cookies/credentials
		const upstream = await fetch(parsed.toString(), {
			method: 'GET',
			headers: {
				// Reduce chance of hotlink protection issues
				'User-Agent': 'Mozilla/5.0 (compatible; BabBuddy/1.0; +https://example.com)',
				Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
				Referer: '',
			},
			cache: 'no-store',
			redirect: 'follow',
		})

		if (!upstream.ok || !upstream.body) {
			return new NextResponse('Upstream fetch failed', { status: 502 })
		}

		const contentType = upstream.headers.get('content-type') || 'application/octet-stream'
		const res = new NextResponse(upstream.body, {
			status: 200,
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
			},
		})
		return res
	} catch (error) {
		console.error('Image proxy error:', error)
		return new NextResponse('Invalid url', { status: 400 })
	}
}
