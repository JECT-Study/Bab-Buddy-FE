import { copyToClipboard, shareToKakao } from '@/features/share/utils/share'
import { useCallback } from 'react'
import { useInitializeKakaoShareSDK } from './useInitializeKakaoShareSDK'

export const useShareActions = (
	invitationTitle: string,
	invitationDescription: string,
	invitationImageUrl: string,
	invitationLink: string,
) => {
	// kakao 공유하기를 위한 kakao sdk 초기화
	useInitializeKakaoShareSDK()

	const handleKakaoShare = useCallback(() => {
		shareToKakao({
			title: invitationTitle,
			description: invitationDescription,
			imageUrl: invitationImageUrl,
			link: invitationLink,
		})
	}, [invitationTitle, invitationDescription, invitationImageUrl, invitationLink])

	const handleLinkShare = useCallback(async () => {
		const success = await copyToClipboard(invitationLink)
		if (success) {
			alert('링크가 복사되었습니다.')
		} else {
			alert('링크 복사에 실패했습니다.')
		}
	}, [invitationLink])

	return {
		handleKakaoShare,
		handleLinkShare,
	}
}
