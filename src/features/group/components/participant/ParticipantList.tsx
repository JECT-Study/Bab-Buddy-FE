'use client'

import Icon from '@/shared/components/Icon'
import { type ParticipantType } from '../../types/group'
import Image from 'next/image'
import { useState } from 'react'

interface ParticipantListProps {
	participantList: ParticipantType[]
	totalParticipants: number
	votedParticipants: number
}

export default function ParticipantList({
	participantList,
	totalParticipants,
	votedParticipants,
}: ParticipantListProps) {
	const totalPages = Math.ceil(totalParticipants / 6)
	const [page] = useState(1)

	return (
		<div className="border-gray-10 flex w-full flex-col gap-2 rounded-3xl border-1 bg-white p-6">
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
			<div className="mb-6 space-y-4">
				{participantList.map(({ id, name, imageUrl }) => (
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
			<div className="flex items-center justify-center gap-2">
				<button className="text-gray-30 p-1 hover:text-gray-50">
					<Icon.ArrowLeft size={16} />
				</button>
				<span className="bg-gray-5 text-b2-medium rounded px-3 py-1">{page}</span>
				<span className="text-b2-medium text-gray-30 px-3 py-1">{totalPages}</span>
				<button className="text-gray-30 p-1 hover:text-gray-50">
					<Icon.ArrowRight size={16} />
				</button>
			</div>
		</div>
	)
}
