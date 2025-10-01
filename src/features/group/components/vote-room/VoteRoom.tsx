'use client'
import { type GroupDetailType, type VoteMenu } from '../../types/group'
import { useState, useEffect } from 'react'
import VoteStatus from './VoteStatus'
import AddMenu from './AddMenu'
import Icon from '@/shared/components/Icon'
import { TAB_MENUS } from '../../constants/group'
import ParticipantList from '../participant/ParticipantList'
import VoteActionButtons from './VoteActionButtons'

interface Props {
	room: GroupDetailType
}

const VoteRoom = ({
	room: { roomId, title, totalParticipants, participantList, votedParticipants, ...rest },
}: Props) => {
	const [activeTab, setActiveTab] = useState<'menu' | 'vote'>('menu')
	const [voteMenus, setVoteMenus] = useState<VoteMenu[]>([])
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
		<div className={`flex w-full flex-col items-center rounded-[28px] bg-white p-6`}>
			{/* 그룹 삭제 */}
			<div className="mb-6 flex w-full justify-end">
				<span className="text-b1-medium color-[--color-gray-50] cursor-pointer">그룹 삭제하기</span>
			</div>
			{/* 그룹 제목 및 참여자 수 */}
			<div className="mb-6 flex w-full flex-col items-center justify-center gap-2">
				<span className="text-h2-bold">{title}</span>
				<div className="flex items-center gap-2">
					<Icon.GroupMembers />
					<span className="text-gray-30">{totalParticipants}명 참여중</span>
				</div>
			</div>
			{/* 탭 메뉴 */}
			<div className="flex w-full">
				<ul className="mb-4 flex gap-2">
					{TAB_MENUS.map((menu) => (
						<li
							key={menu.value}
							className={`text-b2-bold rounded-3xl px-4 py-2 ${activeTab === menu.value ? 'color-[--color-gray-190] bg-gray-5' : 'text-gray-30'}`}
						>
							<button onClick={() => setActiveTab(menu.value as 'menu' | 'vote')}>
								{menu.label}
							</button>
						</li>
					))}
				</ul>
			</div>
			<div className="flex h-[67.5%] w-full flex-1">
				<div className="mr-6 flex h-full max-h-full w-[70%] flex-col gap-2">
					<div
						className={`border-gray-10 flex h-full w-full flex-col gap-2 rounded-3xl border-1 bg-white ${activeTab === 'vote' ? 'px-6 py-2' : 'p-6'}`}
					>
						{activeTab === 'menu' ? (
							<AddMenu
								room={{
									roomId,
									title,
									participantList,
									totalParticipants,
									votedParticipants,
									...rest,
								}}
								setVoteMenus={setVoteMenus}
							/>
						) : (
							<VoteStatus voteMenus={voteMenus} />
						)}
					</div>
				</div>
				<div className="flex h-full w-[27.6%] flex-col gap-[22px]">
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
				</div>
			</div>
		</div>
	)
}

export default VoteRoom
