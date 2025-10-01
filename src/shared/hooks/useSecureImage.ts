import { useState, useEffect } from 'react'

/**
 * HTTPS 환경에서 HTTP 이미지를 프록시를 통해 안전하게 로드하는 커스텀 훅
 * @param imageUrl 원본 이미지 URL
 * @returns [프록시 처리된 이미지 URL, setter 함수]
 */
export function useSecureImage(
	imageUrl: string,
): [string, React.Dispatch<React.SetStateAction<string>>] {
	const [imgSrc, setImgSrc] = useState(imageUrl)

	useEffect(() => {
		// https 환경에서 http 이미지는 프록시로 우회하여 SSL/혼합콘텐츠 오류 방지
		if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
			try {
				const u = new URL(imageUrl)
				if (u.protocol === 'http:') {
					setImgSrc(`/api/image-proxy?url=${encodeURIComponent(imageUrl)}`)
					return
				}
			} catch (error) {
				console.error('Error parsing image URL:', error)
			}
		}
		setImgSrc(imageUrl)
	}, [imageUrl])

	return [imgSrc, setImgSrc]
}
