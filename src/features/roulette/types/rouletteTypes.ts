export type FoodCategory = '전체' | '한식' | '중식' | '일식' | '양식' | '기타'

export interface RouletteResult {
	result: string
}

export interface RouletteResultModalProps {
	isOpen: boolean
	result: string
	onClose: () => void
	onShare: () => void
}

export interface FoodCategorySelectorProps {
	selectedCategory: FoodCategory
	onCategoryChange: (category: FoodCategory) => void
}
