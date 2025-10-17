import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SurveyResponse } from '@/features/surveyResult/types/surveyResultTypes'

export type SurveyStep = 1 | 2 | 3

interface FoodSurveyState {
	surveyResponses: SurveyResponse
	_hasHydrated: boolean
	setHasHydrated: (state: boolean) => void
	setResponse: (step: SurveyStep, value: string) => void
	setAddress: (address: string) => void
	clearResponses: () => void
}

const initialState: SurveyResponse = {
	survey1: null,
	survey2: null,
	survey3: null,
	address: null,
}

export const useFoodSurveyStore = create<FoodSurveyState>()(
	persist(
		(set) => ({
			surveyResponses: initialState,
			_hasHydrated: false,
			setHasHydrated: (state) => {
				set({ _hasHydrated: state })
			},
			setResponse: (step: SurveyStep, value: string) =>
				set((state) => ({
					surveyResponses: {
						...state.surveyResponses,
						[`survey${step}`]: value,
					},
				})),
			setAddress: (address: string) =>
				set((state) => ({
					surveyResponses: {
						...state.surveyResponses,
						address,
					},
				})),
			clearResponses: () =>
				set((state) => ({
					surveyResponses: {
						...initialState,
						address: state.surveyResponses.address,
					},
				})),
		}),
		{
			name: 'food-survey-storage',
			partialize: (state) => ({ surveyResponses: state.surveyResponses }),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true)
			},
		},
	),
)
