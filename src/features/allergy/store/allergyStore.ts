import { create } from 'zustand'

interface AllergyStore {
	allergyTypes: string[]
	setAllergyTypes: (allergyTypes: string[]) => void
}

export const useAllergyStore = create<AllergyStore>((set) => ({
	allergyTypes: [],
	setAllergyTypes: (allergyTypes) => set({ allergyTypes }),
}))
