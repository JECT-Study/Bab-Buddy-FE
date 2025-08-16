import React from 'react'
import SharedSurveyResult from '@/features/sharedSurveyResult/components/SharedSurveyResult'
import Header from '@/shared/components/Header'

interface Props {
	params: {
		id: string
	}
}

const SharedSurveyResultPage = ({ params }: Props) => {
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
