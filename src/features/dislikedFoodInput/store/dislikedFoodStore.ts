import { create } from 'zustand'

export interface DislikedFood {
	id: string
	foodName: string
}

interface DislikedFoodStore {
	foods: DislikedFood[]
	setFoods: (foods: DislikedFood[]) => void
	removeFoodFromState: (foodId: string) => void
}

export const useDislikedFoodStore = create<DislikedFoodStore>((set) => ({
	foods: [],
	setFoods: (foods) => set({ foods }),
	removeFoodFromState: (foodId: string) =>
		set((state) => ({
			foods: state.foods.filter((food) => food.id !== foodId),
		})),
}))
