'use client'

import React from 'react'
import Image from 'next/image'

interface RouletteSpinnerProps {
	className?: string
	imageClassName?: string
}

const RouletteSpinner: React.FC<RouletteSpinnerProps> = ({ className, imageClassName }) => {
	return (
		<div className={`relative mx-auto h-[min(32vh,360px)] w-full max-w-lg ${className}`}>
			<Image
				src="/assets/video/roullet.gif"
				alt="룰렛 스피너"
				fill
				sizes="(max-width: 1280px) 100vw, 360px"
				className={`object-contain ${imageClassName}`}
				priority
			/>
		</div>
	)
}

export default RouletteSpinner
