'use client'
import { type GroupDetailType } from '../../types/group'
import { useState } from 'react'

import VoteRoomParticipantPanel from './VoteRoomParticipantPanel'
import VoteRoomStepper from './VoteRoomStepper'
import VoteRoomContent from './VoteRoomContent'

interface Props {
	room: GroupDetailType
}

const VoteRoomContainer = ({ room }: Props) => {
	const [activeStep, setActiveStep] = useState(1)

	return (
		<div className="flex max-h-[585px] min-h-[585px] w-full space-x-6">
			<aside className="p border-gray-10 flex w-[15.9%] flex-col items-center rounded-[28px] border-1 bg-white px-[18px] pt-[30px] pb-9">
				<VoteRoomStepper
					title={room.title}
					activeStep={activeStep}
					setActiveStep={setActiveStep}
					roomId={room.roomId}
				/>
			</aside>
			<div
				className={`border-gray-10 flex w-[57.9%] flex-col items-center overflow-hidden rounded-[28px] border-1 bg-white p-6`}
			>
				<VoteRoomContent step={activeStep} room={room} />
			</div>
			<aside className="flex h-full w-[22.3%] flex-col gap-[22px]">
				<VoteRoomParticipantPanel
					roomId={room.roomId}
					title={room.title}
					participantList={room.participantList}
					totalParticipants={room.totalParticipants}
					votedParticipants={room.votedParticipants}
				/>
			</aside>
		</div>
	)
}

export default VoteRoomContainer
