import Image from 'next/image'
import { memo } from 'react'

export const ResultLoading = memo(() => {
	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
			<div className="relative h-16 w-16">
				<Image
					src="/assets/icons/loading.svg"
					alt="로딩"
					fill
					className="animate-bounce object-contain"
					priority
				/>
			</div>
			<div className="text-b1-medium">잠깐만 기다려주세요!</div>
			<div className="text-b2-medium text-gray-30 whitespace-pre-line">
				{`알레르기 정보와 기호를 바탕으로 \n 딱 맞는 추천을 준비하고 있어요.`}
			</div>
		</div>
	)
})

ResultLoading.displayName = 'ResultLoading'
