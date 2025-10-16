'use client'

import GroupList from '@/features/group/components/GroupList'
import CreateGroupRoomModal from './modal/CreateGroupRoomModal'
import { makeGroupRoom } from '../api/groupListApi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import VotingMethodModal from './modal/VotingMethodModal'

const useMakeGroupRoom = () => {
	const router = useRouter()

	const handleSubmit = async (title: string, votingMethod: 'vote' | 'random') => {
		const roomId = await makeGroupRoom(title, votingMethod)

		// TODO: 서버에서 roomId 생성 시 실패 응답 확인 필요
		if (roomId != null && roomId != 0 && roomId != -1) {
			return router.push(`/group/${roomId}`)
		}

		console.log('title', title, 'votingMethod', votingMethod)
		return router.push(`/group/${roomId}`)
	}

	return { handleSubmit }
}

export default function GroupContainer() {
	const { handleSubmit } = useMakeGroupRoom()
	const [groupName, setGroupName] = useState<string>('')
	const [isModalOpen, setIsModalOpen] = useState<'roomName' | 'method' | null>(null)

	const handleCloseRoomNameModal = () => {
		setIsModalOpen(null)
		setGroupName('')
	}

	return (
		<>
			<GroupList />

			<button
				type="button"
				className="bg-orange text-h3-medium mt-6 flex w-[640px] flex-1 justify-center rounded-3xl px-9 py-4 text-white outline-none"
				onClick={() => setIsModalOpen('roomName')}
			>
				새 그룹 만들기
			</button>
			{isModalOpen === 'roomName' && (
				<CreateGroupRoomModal
					groupName={groupName}
					setGroupName={setGroupName}
					onClose={handleCloseRoomNameModal}
					onNext={() => setIsModalOpen('method')}
				/>
			)}
			{isModalOpen === 'method' && (
				<VotingMethodModal
					groupName={groupName}
					onClose={() => {
						setIsModalOpen(null)
						setGroupName('')
					}}
					onClickPrev={() => setIsModalOpen('roomName')}
					onSubmit={handleSubmit}
				/>
			)}
		</>
	)
}
