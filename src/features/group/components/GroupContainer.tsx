'use client'

import GroupEmpty from '@/features/group/components/GroupEmpty'
import GroupList from '@/features/group/components/GroupList'
import type { GroupType } from '../types/group'
import { useModal } from '@/shared/hooks/useModal'
import CreateGroupRoomModal from './modal/CreateGroupRoomModal'
// import { makeGroupRoom } from '../api/groupListApi'
import { useRouter } from 'next/navigation'

interface Props {
	groups: GroupType[]
}

const useMakeGroupRoom = () => {
	const router = useRouter()

	const handleSubmit = async (title: string) => {
		// const roomId = await makeGroupRoom(title)
		// // TODO: 서버에서 roomId 생성 시 실패 응답 확인 필요
		// if (roomId != null && roomId != 0 && roomId != -1) {
		// 	return router.push(`/group/${roomId}`)
		// }

		router.push(`/group/1`)
	}

	return { handleSubmit }
}

export default function GroupContainer({ groups }: Props) {
	const { isOpen, openModal, closeModal } = useModal()
	const { handleSubmit } = useMakeGroupRoom()

	return (
		<>
			{groups.length ? <GroupList groups={groups} /> : <GroupEmpty />}

			<button
				type="button"
				className="bg-orange text-h3-medium mt-6 flex w-[640px] flex-1 justify-center rounded-3xl px-9 py-4 text-white"
				onClick={openModal}
			>
				새 그룹 만들기
			</button>
			{isOpen && <CreateGroupRoomModal onClose={closeModal} onSubmit={handleSubmit} />}
		</>
	)
}
