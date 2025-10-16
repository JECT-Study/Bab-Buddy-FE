'use client'

import Icon from '@/shared/components/Icon'
import type { ParticipantType } from '../../types/group'
import Image from 'next/image'
import { Pagination } from '@/shared/components/Pagination'
import { usePagination } from '@/shared/hooks/usePagination'

interface ParticipantListProps {
	participantList: ParticipantType[]
	totalParticipants: number
	votedParticipants: number
}

const PARTICIPANTS_PER_PAGE = 6

export default function ParticipantList({
	participantList,
	totalParticipants,
	votedParticipants,
}: ParticipantListProps) {
	const { totalPages, page, paginatedItems, handlePageChange } = usePagination<ParticipantType>({
		items: participantList,
		itemCountPerPage: PARTICIPANTS_PER_PAGE,
	})

	return (
		<div className="border-gray-10 flex w-full flex-1 flex-col gap-2 rounded-3xl border-1 bg-white p-6">
			{/* 참여자 목록 헤더 */}
			<div className="flex w-full items-center justify-between">
				<span className="text-b1-medium">참여자 목록</span>
				<button className="text-gray-30">
					<Icon.Replay />
				</button>
			</div>

			{/* 투표 진행 상태 */}
			<div className="bg-gray-5 mb-4 rounded-3xl p-3">
				<p className="text-b2-medium text-gray-30">
					투표참여 {totalParticipants}명 중{' '}
					<span className="font-semibold text-orange-500">{votedParticipants}명 완료!</span>
				</p>
			</div>

			{/* 참여자 리스트 */}
			<div className="mb-6 flex-1 space-y-4">
				{paginatedItems.map(({ id, name, imageUrl }) => (
					<div key={id} className="flex items-center gap-2 rounded-lg">
						{imageUrl ? (
							<Image src={imageUrl} alt={`${name} image`} width={30} height={30} />
						) : (
							<Icon.GroupMembers size={30} />
						)}
						<span className="text-b2-medium text-gray-190">{name}</span>
					</div>
				))}
			</div>

			{/* 페이지네이션 */}
			<Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
		</div>
	)
}
