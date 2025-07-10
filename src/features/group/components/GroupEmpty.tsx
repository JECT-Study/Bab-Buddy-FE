'use client'

import Icon from '@/shared/components/Icon'
import Image from 'next/image'

export default function GroupEmpty() {
	const handleClick = () => {}

	return (
		<div className="flex flex-col items-center">
			<Image
				src="/assets/images/groupVote-blank-babbuddy.webp"
				alt="밥버디 캐릭터"
				width={209}
				height={128}
				className="my-12"
			/>
			<div className="flex flex-col items-center gap-2">
				<p className="text-b1-medium">그룹방이 텅 비었어요 새로운 방을 생성해보세요</p>
				<button
					type="button"
					onClick={handleClick}
					className="text-caption-medium text-gray-30 flex items-center gap-2"
				>
					<Icon.InfoOutline />
					모두와 함께 메뉴 정하기 가이드
				</button>
			</div>
		</div>
	)
}
