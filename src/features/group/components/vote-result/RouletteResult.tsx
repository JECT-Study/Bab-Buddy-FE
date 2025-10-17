import Image from 'next/image'

interface RouletteResultProps {
	menu: string
}
export default function RouletteResult({ menu }: RouletteResultProps) {
	return (
		<li className="relative flex min-h-[263px] w-full max-w-[281px] flex-col justify-between rounded-3xl bg-white p-6">
			<div className="flex flex-col gap-[10px]">
				<span className="text-b2-medium">{menu}</span>
			</div>
			<div className={`flex w-full items-end justify-center`}>
				<Image
					src={'/assets/icons/group_result_gold.svg'}
					alt={`룰렛 결과 이미지`}
					width={96}
					height={103}
				/>
			</div>
		</li>
	)
}
