'use client'

import React from 'react'
import KakaoMap from '@/features/kakaoMap/components/KakaoMap'

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
	return (
		<div className="relative h-[453px] flex-1 overflow-hidden rounded-[24px]">
			<KakaoMap restaurants={restaurants ?? []} />
		</div>
	)
}

export default MapSection
