interface ResultPageProps {
	params: Promise<{
		id: string
	}>
}

export default async function ResultPage({ params }: ResultPageProps) {
	const { id } = await params

	return <div>ResultPage {id}</div>
}
