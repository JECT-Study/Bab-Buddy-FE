import { useEffect } from 'react'

export const useOnPressEsc = (callback: () => void) => {
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				callback()
			}
		}
		document.addEventListener('keydown', handleEsc)
		return () => {
			document.removeEventListener('keydown', handleEsc)
		}
	}, [callback])
}
