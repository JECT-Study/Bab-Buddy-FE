interface ShareData {
	title: string
	description: string
	imageUrl: string
	link: string
}

declare global {
	interface Window {
		Kakao: any
	}
}

export const initializeKakao = () => {
	const initKakao = () => {
		if (window.Kakao && !window.Kakao.isInitialized()) {
			window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY)
		}
	}

	if (document.readyState === 'complete') {
		initKakao()
	} else {
		window.addEventListener('load', initKakao)
		return () => window.removeEventListener('load', initKakao)
	}
}

export const shareToKakao = ({ title, description, imageUrl, link }: ShareData) => {
	if (!window.Kakao?.Share) {
		console.error('Kakao SDK is not loaded')
		return
	}

	window.Kakao.Share.sendDefault({
		objectType: 'feed',
		content: {
			title,
			description,
			imageUrl,
			link: {
				mobileWebUrl: link,
				webUrl: link,
			},
		},
		buttons: [
			{
				title: '웹으로 보기',
				link: {
					mobileWebUrl: link,
					webUrl: link,
				},
			},
		],
	})
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
	try {
		await navigator.clipboard.writeText(text)
		return true
	} catch (error) {
		console.error('Failed to copy:', error)
		return false
	}
}
