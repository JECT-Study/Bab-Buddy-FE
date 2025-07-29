'use client'

import React from 'react'
import KakaoMap from '@/features/kakaoMap/KakaoMap'

interface MapSectionProps {
	currentLocation: {
		lat: number
		lng: number
	}
	restaurants: {
		id: number
		name: string
		location: {
			lat: number
			lng: number
		}
	}[]
}

export const MapSection: React.FC<MapSectionProps> = ({ currentLocation, restaurants }) => {
	return (
		<div className="relative h-[453px] flex-1 overflow-hidden rounded-[24px]">
			<KakaoMap currentLocation={currentLocation} restaurants={restaurants} />
		</div>
	)
}
