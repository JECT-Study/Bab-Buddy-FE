import Image from 'next/image'

export const ResultLoading = () => {
	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
			<div className="relative h-16 w-16">
				<Image
					src="/assets/icons/loading.svg"
					alt="로딩"
					fill
					className="animate-spin object-contain"
					priority
				/>
			</div>
			<div className="text-b1 font-medium">잠깐만 기다려주세요!</div>
			<div className="text-b2 color-gray-30 whitespace-pre-line">
				알레르기 정보와 기호를 바탕 \n 으로 딱 맞는 추천을 준비하고 있어요.
			</div>
		</div>
	)
}
