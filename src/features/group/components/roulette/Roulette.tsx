'use client'
import RouletteSpinner from '@/features/roulette/components/RouletteSpinner'
import type { MenuItemType } from '../../types/group'
import { useEffect, useRef } from 'react'
import { saveRouletteResult, terminateVoteRoom } from '../../api/voteRoomApi'
import { useRouter } from 'next/navigation'

interface RouletteProps {
	roomId: string
	menuList: MenuItemType[]
	isHostUser: boolean
}

const useRouletteResult = (menuList: string[], roomId: string, isHostUser: boolean) => {
	const resultRef = useRef<string>('')
	const router = useRouter()

	useEffect(() => {
		let timer1: ReturnType<typeof setTimeout>

		timer1 = setTimeout(async () => {
			resultRef.current = menuList[Math.floor(Math.random() * menuList.length)]
			if (!isHostUser) {
				return router.push(`/group/${roomId}/result`)
			}
			const isSaved = await saveRouletteResult(resultRef.current, roomId)

			if (isSaved) {
				await terminateVoteRoom(roomId)
				router.push(`/group/${roomId}/result`)
			} else {
				alert('룰렛 결과 저장 실패')
			}
		}, 2000)

		return () => {
			clearTimeout(timer1)
		}
	}, [menuList, router, roomId, isHostUser])

	return resultRef.current
}

export default function Roulette({ menuList, roomId, isHostUser }: RouletteProps) {
	const menuNames = menuList?.map((menu) => menu.name)
	useRouletteResult(menuNames, roomId, isHostUser)

	return (
		<div className="flex max-w-full flex-col items-center justify-center gap-2.5 rounded-[28px] bg-white py-11">
			<div className="space-between mx-auto flex flex-col justify-center gap-[24px] rounded-[28px] bg-white px-6 py-12">
				{/* 대기 메시지 */}
				<div className="text-center">
					<div className="text-h2-bold text-gray-80 mb-3 whitespace-pre-line">
						{`두근두근 어떤 메뉴가 나올까요? \n 잠시만 기다려주세요. `}
					</div>
				</div>

				{/* 룰렛 스피너 */}
				<RouletteSpinner imageClassName="inset-auto! -right-8!" />
			</div>
		</div>
	)
}
