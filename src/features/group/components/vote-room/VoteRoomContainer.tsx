'use client'
import { useEffect, useState } from 'react'

import VoteRoomParticipantPanel from './VoteRoomParticipantPanel'
import VoteRoomStepper from './VoteRoomStepper'
import VoteRoomContent from './VoteRoomContent'
import { useQuery } from '@tanstack/react-query'
import { getGroupDetailOnClient, getGroupRouletteDetailOnClient } from '../../api/voteRoomApi'
import type { VotingType } from '../../types/group'

const DEFAULT_POLLING_INTERVAL = 5000

const useGroupRoomDetail = (
	roomId: string,
	menuSelectMethod: VotingType,
	pollingInterval = DEFAULT_POLLING_INTERVAL,
) => {
	return useQuery({
		queryKey: ['group', 'vote', roomId],
		queryFn: async () =>
			menuSelectMethod === 'ROULETTE'
				? await getGroupRouletteDetailOnClient(roomId)
				: await getGroupDetailOnClient(roomId),
		// refetchInterval: pollingInterval, // 5초마다 자동 폴링
		// // refetchIntervalInBackground: true, // 백그라운드에서도 폴링
		// refetchOnWindowFocus: true, // 윈도우 포커스 시 리페치
		staleTime: pollingInterval, // 5초 동안은 캐시 사용
	})
}

const VoteRoomContainer = ({
	roomId,
	menuSelectMethod,
}: {
	roomId: string
	menuSelectMethod: VotingType
}) => {
	const [activeStep, setActiveStep] = useState(1)
	const { data: room, isFetching } = useGroupRoomDetail(roomId, menuSelectMethod)
	const [isRouletteFinished, setIsRouletteFinished] = useState(false)

	console.log('room: ', room)

	// TODO API 붙인 후 확인할 것.
	// 1. 룰렛방이 종료된 경우에는 isRouletteFinished를 true로 설정
	// 2.isRouletteFinished가 true인 경우, 룰렛 화면을 자동으로 보여주고 바로 결과로 이동
	useEffect(() => {
		if (room?.voteStatus === 'FINISHED' && room?.menuSelectMethod === 'ROULETTE') {
			setIsRouletteFinished(true)
		}
	}, [room])

	if (isFetching) {
		return <div>Loading...</div>
	}

	if (room == null) {
		throw new Error('Room not found')
	}

	return (
		<div className="flex max-h-[585px] min-h-[585px] w-full space-x-6">
			<aside
				className={`p border-gray-10 flex w-[15.9%] flex-col items-center rounded-[28px] border-1 bg-white px-[18px] pt-[30px] pb-9 transition-opacity duration-300 ${isRouletteFinished ? 'opacity-0' : 'opacity-100'}`}
			>
				<VoteRoomStepper
					room={room}
					activeStep={activeStep}
					setActiveStep={setActiveStep}
					setIsRouletteFinished={setIsRouletteFinished}
				/>
			</aside>
			<div
				className={`border-gray-10 flex w-[57.9%] items-center justify-center overflow-hidden rounded-[28px] border-1 bg-white p-6 ${isRouletteFinished ? '' : 'flex-col'}`}
			>
				<VoteRoomContent step={activeStep} room={room} isRouletteFinished={isRouletteFinished} />
			</div>
			<aside
				className={`flex h-full w-[22.3%] flex-col gap-[22px] transition-opacity duration-300 ${isRouletteFinished ? 'opacity-0' : 'opacity-100'}`}
			>
				<VoteRoomParticipantPanel room={room} />
			</aside>
		</div>
	)
}

export default VoteRoomContainer
