'use client'
import Icon from '@/shared/components/Icon'
import { useOnPressEsc } from '@/shared/hooks/useOnPressEsc'

interface ModalProps {
	children: React.ReactNode
	onClose: () => void
}

export default function Modal({ children, onClose }: ModalProps) {
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		onClose()
	}

	useOnPressEsc(onClose)

	return (
		<div
			className={`fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50`}
			onClick={handleClick}
		>
			{children}
			<button onClick={onClose} className="absolute top-8 right-8 text-white">
				<Icon.Close className="h-8 w-8" />
			</button>
		</div>
	)
}
