'use client'

import React from 'react'
import Header from '@/shared/components/Header'
import DislikedFoodSurvey from '@/features/dislikedFoodSurvey/components/DislikedFoodSurvey'

const DislikedFoodSurveyPage: React.FC = () => {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<DislikedFoodSurvey />
		</div>
	)
}

export default DislikedFoodSurveyPage
