interface SwitchCasesProps {
	step: number
	stepCases: Record<number, React.ReactNode>
	defaultCase?: React.ReactNode
}

export default function SwitchCases({
	step,
	stepCases,
	defaultCase = SwitchCases.defaultCase,
}: SwitchCasesProps) {
	return <>{stepCases[step] || defaultCase}</>
}

SwitchCases.defaultCase = (
	<div className="flex h-full w-full items-center justify-center">존재하지 않는 스텝입니다.</div>
)
