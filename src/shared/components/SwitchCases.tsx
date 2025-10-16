interface SwitchCasesProps {
	value: number
	cases: Record<number, React.ReactNode>
	defaultCase?: React.ReactNode
}

export default function SwitchCases({
	value,
	cases,
	defaultCase = SwitchCases.defaultCase,
}: SwitchCasesProps) {
	return <>{cases[value] || defaultCase}</>
}

SwitchCases.defaultCase = (
	<div className="flex h-full w-full items-center justify-center">존재하지 않는 스텝입니다.</div>
)
