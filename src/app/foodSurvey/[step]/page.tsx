import { notFound } from 'next/navigation'
import Header from '@/shared/components/Header'
import { FoodSurvey } from '@/features/foodSurvey/components/FoodSurvey'
import { SURVEY_CONFIG } from '@/features/foodSurvey/config/surveyConfig'

interface PageProps {
	params: Promise<{ step: string }>
}

export default async function FoodSurveyPage(props: PageProps) {
	const params = await props.params
	const { step } = params
	const stepNum = parseInt(step)

	if (!SURVEY_CONFIG[step as keyof typeof SURVEY_CONFIG] || stepNum < 1 || stepNum > 3) {
		notFound()
	}

	const config = SURVEY_CONFIG[step as keyof typeof SURVEY_CONFIG]

	return (
		<main className="flex h-screen flex-col">
			<Header />
			<FoodSurvey
				step={stepNum}
				beforeText={config.beforeText}
				highlightText={config.highlightText}
				afterText={config.afterText}
				subtitle={config.subtitle}
				backgroundImage={config.backgroundImage}
				options={config.options}
			/>
		</main>
	)
}

// 정적 생성 경로
export function generateStaticParams() {
	return [{ step: '1' }, { step: '2' }, { step: '3' }]
}
