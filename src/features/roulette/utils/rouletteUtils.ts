// 룰렛 메뉴 목록
export const MENU_ITEMS = ['김치찌개', '짜장면', '초밥', '파스타', '비빔밥', '라면']

/**
 * 고유한 룰렛 결과 ID를 생성합니다
 * @returns 고유한 결과 ID
 */
export const generateResultId = (): string => {
	return `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 결과를 공유할 URL을 생성합니다
 * @param resultId 결과 ID
 * @param result 음식 이름
 * @returns 공유 URL
 */
export const generateShareUrl = (resultId: string, result: string): string => {
	const baseUrl = window.location.origin
	return `${baseUrl}/roulette/result/${resultId}?food=${encodeURIComponent(result)}`
}

/**
 * 클립보드에 텍스트를 복사합니다
 * @param text 복사할 텍스트
 * @returns 복사 성공 여부
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
	try {
		await navigator.clipboard.writeText(text)
		return true
	} catch (err) {
		return false
	}
}
