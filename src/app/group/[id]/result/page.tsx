import { getVoteResult } from '@/features/group/api/voteApi'
import VoteResult from '@/features/group/components/vote-result/VoteResult'
interface ResultPageProps {
	params: Promise<{
		id: string
	}>
}

export default async function ResultPage({ params }: ResultPageProps) {
	const { id } = await params
	const result = await getVoteResult(id)

	return <VoteResult result={result} />
}
