import { useEffect } from 'react'

interface UseOnClickOutsideProps {
	callback: () => void
	ref: React.RefObject<HTMLElement | null>
}

export const useOnClickOutside = ({ callback, ref }: UseOnClickOutsideProps) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback()
			}
		}
		document.addEventListener('mousedown', handleClick)
		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	}, [callback, ref])
}
