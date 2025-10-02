import { type ParticipantType } from '../../types/group'
import ParticipantList from '../participant/ParticipantList'
import VoteActionButtons from './VoteActionButtons'
import { useState, useEffect } from 'react'

interface VoteRoomParticipantPanelProps {
	roomId: string
	title: string
	participantList: ParticipantType[]
	totalParticipants: number
	votedParticipants: number
}

export default function VoteRoomParticipantPanel({
	roomId,
	title,
	participantList,
	totalParticipants,
	votedParticipants,
}: VoteRoomParticipantPanelProps) {
	const [invitationImageUrl, setInvitationImageUrl] = useState<string>('')
	const [invitationLink, setInvitationLink] = useState<string>('')

	useEffect(() => {
		// 클라이언트 사이드에서만 실행
		if (typeof window !== 'undefined') {
			// TODO: 이미지 경로 수정 예정
			setInvitationImageUrl(`https://www.ricebuddy.site/assets/images/home_group_babbuddy.webp`)
			setInvitationLink(`${window.location.origin}/group/${roomId}`)
		}
	}, [roomId])

	return (
		<>
			{/* 참여자 목록 */}
			<ParticipantList
				participantList={participantList}
				totalParticipants={totalParticipants}
				votedParticipants={votedParticipants}
			/>
			<VoteActionButtons
				invitationTitle={`${title}을 위한 메뉴 추천`}
				invitationDescription={`${title} 그룹방에 초대합니다.`}
				invitationImageUrl={invitationImageUrl}
				invitationLink={invitationLink}
			/>
		</>
	)
}
