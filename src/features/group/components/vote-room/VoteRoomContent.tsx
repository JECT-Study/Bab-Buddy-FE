import AddMenu from '../menu/AddMenu'
import { type GroupDetailType } from '../../types/group'
import SwitchCases from '@/shared/components/SwitchCases'
import DisLikeMenu from '../menu/DisLikeMenu'
import VoteRoom from './VoteRoom'

interface VoteRoomContentProps {
	step: number
	room: GroupDetailType
}

const STEP_CONTENTS = {
	1: {
		title: '팀원들에게 제안하고 싶은 메뉴를 검색하여 추가해보세요.',
		subTitle: '',
	},
	2: {
		title: '먹기 힘든 메뉴를 추가해주세요.',
		subTitle:
			'싫어하거나 먹지 못하는 메뉴를 등록하면 팀원들이 해당 메뉴를 투표할 때 살짝 알려드릴게요 :)',
	},
	3: {
		title: '팀원들이 제안한 메뉴를 살펴보고 먹고 싶은 메뉴에 투표해보세요.',
		subTitle: '',
	},
}

type StepType = keyof typeof STEP_CONTENTS

export default function VoteRoomContent({
	step,
	room: { roomId, menuList, dislikeMenuList },
}: VoteRoomContentProps) {
	return (
		<>
			{/* 스텝 제목 및 서브타이틀 */}
			<div className="mb-8 flex min-h-[70px] w-full flex-col gap-2">
				<h3 className="text-h3-bold">{STEP_CONTENTS[step as StepType].title}</h3>
				<p className="text-b2-medium text-gray-50">{STEP_CONTENTS[step as StepType].subTitle}</p>
			</div>
			{/* 스텝 콘텐츠 */}
			<div className="flex h-full w-full">
				<div className="flex h-full max-h-full w-full flex-col gap-2">
					<SwitchCases
						value={step}
						cases={{
							1: <AddMenu roomId={roomId} menuList={menuList} />,
							2: <DisLikeMenu roomId={roomId} dislikeMenuList={dislikeMenuList} />,
							3: <VoteRoom voteMenus={menuList} dislikeMenuList={dislikeMenuList} />,
						}}
					/>
				</div>
			</div>
		</>
	)
}
