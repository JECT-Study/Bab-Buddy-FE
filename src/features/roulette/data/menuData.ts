import type { FoodCategory } from '../types/rouletteTypes'

// 개별 카테고리별 메뉴 데이터
const CATEGORY_MENUS = {
	korean: [
		'김치찌개',
		'비빔밥',
		'불고기',
		'된장찌개',
		'김치전',
		'닭볶음탕',
		'삼겹살',
		'갈비탕',
		'냉면',
		'순두부찌개',
	],
	chinese: [
		'짜장면',
		'짬뽕',
		'탕수육',
		'양장피',
		'볶음밥',
		'마파두부',
		'깐풍기',
		'유린기',
		'팔보채',
		'크림새우',
	],
	japanese: [
		'초밥',
		'라멘',
		'우동',
		'돈카츠',
		'오야코동',
		'규동',
		'회',
		'사시미',
		'텐동',
		'오코노미야키',
	],
	western: [
		'파스타',
		'피자',
		'스테이크',
		'샐러드',
		'리조또',
		'그라탕',
		'라자냐',
		'퀘사디야',
		'부리또',
		'타코',
	],
	etc: ['햄버거', '라면', '떡볶이', '순대', '닭발', '족발', '보쌈', '곱창', '막창', '닭갈비'],
}

// 전체 메뉴 (모든 카테고리의 메뉴를 합친 것)
const ALL_MENUS = Object.values(CATEGORY_MENUS).flat()

// 카테고리별 메뉴 데이터
export const MENU_DATA: Record<FoodCategory, string[]> = {
	all: ALL_MENUS,
	...CATEGORY_MENUS,
}
