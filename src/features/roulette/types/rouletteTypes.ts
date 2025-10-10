export type FoodCategory = 'all' | 'korean' | 'chinese' | 'japanese' | 'western' | 'etc'

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
