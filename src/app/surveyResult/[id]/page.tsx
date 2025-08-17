import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SharedSurveyResult from '@/features/sharedSurveyResult/components/SharedSurveyResult'
import Header from '@/shared/components/Header'

export const metadata: Metadata = {
	title: 'BabBuddy',
	description: '설문 결과를 확인해보세요',
}

interface PageProps {
	params: { id: string }
}

export default function SharedSurveyResultPage({ params }: PageProps) {
	const { id } = params

	if (!id || isNaN(Number(id))) {
		notFound()
	}

	return (
		<main className="flex min-h-screen flex-col">
			<Header />
			<SharedSurveyResult id={id} />
		</main>
	)
}
