import { useEffect } from 'react'
import { initializeKakao } from '@/features/share/utils/share'

export const useInitializeKakaoShare = () => {
	useEffect(() => {
		const cleanup = initializeKakao()
		return cleanup
	}, [])
}
