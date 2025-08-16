import React from 'react'
import { Metadata } from 'next'
import SharedSurveyResult from '@/features/sharedSurveyResult/components/SharedSurveyResult'
import Header from '@/shared/components/Header'

interface PageProps {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
	title: 'BabBuddy',
	description: '설문 결과를 확인해보세요',
}

const SharedSurveyResultPage = ({ params }: PageProps) => {
	const { id } = params

	if (!id) {
		return (
			<>
				<Header />
				<div className="flex h-[calc(100vh-200px)] items-center justify-center">
					<p className="text-lg text-gray-700">잘못된 접근입니다. 올바른 URL을 확인해주세요.</p>
				</div>
			</>
		)
	}

	return (
		<>
			<Header />
			<SharedSurveyResult id={id} />
		</>
	)
}

export default SharedSurveyResultPage
