import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LocationState {
	location: {
		lat: number
		lng: number
	}
	setLocation: (location: LocationState['location']) => void
}

const initialState: LocationState['location'] = {
	lat: 37.4979, // 기본 위치 설정
	lng: 127.0276,
}

export const useLocationStore = create<LocationState>()(
	persist(
		(set) => ({
			location: initialState,
			setLocation: (location) => set({ location }),
		}),
		{
			name: 'location-storage', // localStorage에 저장될 키 이름
		},
	),
)
