import { useCallback } from 'react'
import { RouletteResult } from '../types/rouletteTypes'
import { MENU_ITEMS } from '../utils/rouletteUtils'

/**
 * 룰렛 결과를 생성하는 훅
 * @returns 룰렛 결과 생성 함수
 */
export const useRoulette = () => {
	/**
	 * 룰렛 결과를 생성합니다
	 * @param foodName URL에서 전달받은 음식 이름 (선택사항)
	 * @returns 룰렛 결과
	 */
	const generateRouletteResult = useCallback((foodName?: string | null): RouletteResult => {
		if (foodName && MENU_ITEMS.includes(foodName)) {
			// URL에 음식 이름이 있으면 해당 음식 사용
			return {
				result: foodName,
			}
		} else {
			// 없으면 랜덤 선택
			const randomMenu = MENU_ITEMS[Math.floor(Math.random() * MENU_ITEMS.length)]
			return {
				result: randomMenu,
			}
		}
	}, [])

	return {
		generateRouletteResult,
	}
}
