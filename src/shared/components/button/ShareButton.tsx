import clsx from 'clsx'
import Icon from '../Icon'

interface ShareButtonProps {
	onClick: () => void
	buttonLabel?: string
	iconClassName?: string
	buttonClassName?: string
}

export default function ShareButton({
	onClick,
	buttonLabel = '링크 공유하기',
	iconClassName,
	buttonClassName,
}: ShareButtonProps) {
	return (
		<button
			onClick={onClick}
			className={clsx(
				'bg-orange flex items-center justify-center gap-2 rounded-[30px] text-white outline-none',
				buttonClassName,
			)}
		>
			<Icon.Share size={15} className={clsx(iconClassName)} />
			{buttonLabel}
		</button>
	)
}
