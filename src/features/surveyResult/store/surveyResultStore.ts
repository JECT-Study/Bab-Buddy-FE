import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SurveyResultState {
	resultId: number
	_hasHydrated: boolean
	setResultId: (state: number) => void
	setHasHydrated: (state: boolean) => void
}

export const useSurveyResultStore = create<SurveyResultState>()(
	persist(
		(set) => ({
			resultId: 0,
			_hasHydrated: false,
			setResultId: (state) => {
				set({ resultId: state })
			},
			setHasHydrated: (state) => {
				set({ _hasHydrated: state })
			},
		}),
		{
			name: 'survey-result-storage',
			partialize: (state) => ({ resultId: state.resultId }),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true)
			},
		},
	),
)
