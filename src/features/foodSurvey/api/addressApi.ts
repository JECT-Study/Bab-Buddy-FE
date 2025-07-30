interface GetAddressResponse {
	address: string | null
}

export const getAddressFromCoords = async (
	latitude: number,
	longitude: number,
): Promise<GetAddressResponse> => {
	try {
		const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`

		// Clean up API key - remove quotes and trim whitespace
		const rawApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || ''
		const kakaoApiKey = rawApiKey.replace(/['"]/g, '').trim()

		if (!kakaoApiKey) {
			throw new Error('Kakao REST API key is not configured')
		}

		// Validate API key format
		if (!/^[a-zA-Z0-9]+$/.test(kakaoApiKey)) {
			throw new Error('Invalid Kakao REST API key format')
		}

		const response = await fetch(url, {
			headers: {
				Authorization: `KakaoAK ${kakaoApiKey}`,
			},
		})

		if (!response.ok) {
			throw new Error(`Failed to fetch address: ${response.status}`)
		}

		const data = await response.json()

		if (!data.documents || data.documents.length === 0) {
			return { address: null }
		}

		return {
			address: data.documents[0].address.address_name,
		}
	} catch (error) {
		console.error('Error getting address:', error)
		return { address: null }
	}
}
