import type { Metadata } from 'next'

export const metadata: Metadata = {
	description: '그룹방에 참여해보세요',
}

interface Props {
	params: Promise<{ id: string }>
}

// TODO :: API 호출 - 존재하지 않는 그룹방일 경우, not-found 페이지 표시

export default async function GroupDetailPage({ params }: Props) {
	const { id } = await params

	return <>그룹 {id}</>
}
