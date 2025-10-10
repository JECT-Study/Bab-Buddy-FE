import { FoodCategory } from '../types/rouletteTypes'
import { MENU_DATA } from '../data/menuData'

// 카테고리 옵션 (컴포넌트에서 사용)
export const CATEGORY_OPTIONS: { value: FoodCategory; label: string }[] = [
	{ value: 'all', label: '전체' },
	{ value: 'korean', label: '한식' },
	{ value: 'chinese', label: '중식' },
	{ value: 'japanese', label: '일식' },
	{ value: 'western', label: '양식' },
	{ value: 'etc', label: '기타' },
]

// 룰렛 메뉴 목록 (전체 카테고리용 - 하위 호환성)
export const MENU_ITEMS = MENU_DATA.all

/**
 * 선택된 카테고리에 따른 메뉴 목록을 반환합니다
 * @param category 선택된 카테고리
 * @returns 해당 카테고리의 메뉴 목록
 */
export const getMenuItemsByCategory = (category: FoodCategory): string[] => {
	return MENU_DATA[category] || MENU_DATA.all
}

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
 * @param category 선택된 카테고리 (선택사항)
 * @returns 공유 URL
 */
export const generateShareUrl = (
	resultId: string,
	result: string,
	category?: FoodCategory,
): string => {
	const baseUrl = window.location.origin
	const foodParam = `food=${encodeURIComponent(result)}`
	const categoryParam =
		category && category !== 'all' ? `&category=${encodeURIComponent(category)}` : ''

	return `${baseUrl}/roulette/result/${resultId}?${foodParam}${categoryParam}`
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
