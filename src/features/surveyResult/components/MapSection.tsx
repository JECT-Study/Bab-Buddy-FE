'use client'

import React from 'react'
import KakaoMap from '@/features/kakaoMap/components/KakaoMap'
import { useLocationStore } from '@/shared/store/locationStore'

export interface MapSectionProps {
	restaurants?: Array<{
		id: number
		rank: number
		name: string
		location: {
			lat: number
			lng: number
		}
	}>
}

const MapSection: React.FC<MapSectionProps> = ({ restaurants }) => {
	const { location } = useLocationStore()

	return (
		<div className="relative h-[453px] flex-1 overflow-hidden rounded-[24px]">
			<KakaoMap currentLocation={location} restaurants={restaurants ?? []} />
		</div>
	)
}

export default MapSection
