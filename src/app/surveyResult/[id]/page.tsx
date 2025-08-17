import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SharedSurveyResult from '@/features/sharedSurveyResult/components/SharedSurveyResult'
import Header from '@/shared/components/Header'

export const metadata: Metadata = {
	title: 'BabBuddy',
	description: '설문 결과를 확인해보세요',
}

interface PageProps {
	params: Promise<{ id: string }>
}

export default async function SharedSurveyResultPage(props: PageProps) {
	const params = await props.params
	const { id } = params

	if (!id || isNaN(Number(id))) {
		notFound()
	}

	return (
		<>
			<Header />
			<SharedSurveyResult id={id} />
		</>
	)
}
