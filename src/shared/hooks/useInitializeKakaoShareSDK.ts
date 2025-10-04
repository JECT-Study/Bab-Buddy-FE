import { useEffect } from 'react'
import { initializeKakao } from '@/features/share/utils/share'

export const useInitializeKakaoShareSDK = () => {
	useEffect(() => {
		const cleanup = initializeKakao()
		return cleanup
	}, [])
}
