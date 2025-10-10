import { useCallback } from 'react'
import { RouletteResult, FoodCategory } from '../types/rouletteTypes'
import { getMenuItemsByCategory } from '../utils/rouletteUtils'

/**
 * 룰렛 결과를 생성하는 훅
 * @returns 룰렛 결과 생성 함수
 */
export const useRoulette = () => {
	/**
	 * 룰렛 결과를 생성합니다
	 * @param category 선택된 음식 카테고리
	 * @param foodName URL에서 전달받은 음식 이름 (선택사항)
	 * @returns 룰렛 결과
	 */
	const generateRouletteResult = useCallback(
		(category: FoodCategory = 'all', foodName?: string | null): RouletteResult => {
			const menuItems = getMenuItemsByCategory(category)

			if (foodName && menuItems.includes(foodName)) {
				// URL에 음식 이름이 있으면 해당 음식 사용
				return {
					result: foodName,
				}
			} else {
				// 없으면 해당 카테고리에서 랜덤 선택
				const randomMenu = menuItems[Math.floor(Math.random() * menuItems.length)]
				return {
					result: randomMenu,
				}
			}
		},
		[],
	)

	return {
		generateRouletteResult,
	}
}
