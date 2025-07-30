import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SurveyResponse } from '@/features/surveyResult/types/surveyResultTypes'

export type SurveyStep = 1 | 2 | 3

interface FoodSurveyState {
	surveyResponses: SurveyResponse
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
		},
	),
)
