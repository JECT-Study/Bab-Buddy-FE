import { getRouletteResult, getVoteResult } from '@/features/group/api/voteApi'
import { getGroupMenuSelectMethod } from '@/features/group/api/voteRoomApi'
import VoteResult from '@/features/group/components/vote-result/VoteResult'
import type { VotingType } from '@/features/group/types/group'
interface ResultPageProps {
	params: Promise<{
		id: string
	}>
}

export default async function ResultPage({ params }: ResultPageProps) {
	const { id } = await params
	const { menuSelectMethod } = await getGroupMenuSelectMethod(id)

	const result =
		menuSelectMethod === 'ROULETTE' ? await getRouletteResult(id) : await getVoteResult(id)

	return <VoteResult menuSelectMethod={menuSelectMethod as VotingType} result={result} />
}
