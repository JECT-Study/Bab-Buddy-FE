export interface SurveyOption {
	id: string
	label: string
	sublabel: string
	icon: FoodSurveyIconType
}

export interface FoodSurveyProps {
	step: number
	beforeText: string
	highlightText: string
	afterText: string
	subtitle: string
	backgroundImage: string
	options: SurveyOption[]
}

export type FoodSurveyIconType =
	| 'taste_mild'
	| 'taste_plain'
	| 'taste_spicy'
	| 'taste_staple'
	| 'taste_unique'
	| 'food_fish'
	| 'food_greasy'
	| 'food_heavy'
	| 'food_none'
	| 'food_salty'
	| 'food_soupy'
	| 'restaurant_chinese'
	| 'restaurant_global'
	| 'restaurant_italian'
	| 'restaurant_japanese'
	| 'restaurant_korean'
