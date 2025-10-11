'use client'

import React from 'react'
import Image from 'next/image'

const RouletteSpinner: React.FC = () => {
	return (
		<div className="relative mx-auto h-[min(32vh,360px)] w-full max-w-lg">
			<Image
				src="/assets/video/roullet.gif"
				alt="룰렛 스피너"
				fill
				sizes="(max-width: 1280px) 100vw, 360px"
				className="object-contain"
				priority
			/>
		</div>
	)
}

export default RouletteSpinner
