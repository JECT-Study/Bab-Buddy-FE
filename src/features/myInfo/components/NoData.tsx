import Image from 'next/image'

interface NoDataProps {
	title: string
	subTitle: string
}
export const NoData = (textData: NoDataProps) => {
	return (
		<div className="item-center flex justify-center">
			<div className="flex min-h-[283px] w-[354px] flex-col items-center justify-center gap-[32px] py-[64px]">
				<Image
					src="/assets/images/groupVote-blank-babbuddy.webp"
					alt="밥버디 캐릭터"
					width={209}
					height={128}
				/>
				<div className="text-center">
					<p className="text-b1-medium">{textData.title}</p>
					<p className="text-b2-medium text-gray-30 whitespace-pre-line">
						{textData.subTitle.replace(/\\n/g, '\n')}
					</p>
				</div>
			</div>
		</div>
	)
}
