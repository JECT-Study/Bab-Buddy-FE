// 토큰 관리 유틸리티
export const AuthStorage = {
	// 액세스 토큰 저장
	setAccessToken: (token: string) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('accessToken', token)
		}
	},

	// 액세스 토큰 조회
	getAccessToken: (): string | null => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('accessToken')
		}
		return null
	},

	// 토큰 삭제 (로그아웃)
	clearTokens: () => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('accessToken')
		}
	},

	// 토큰 존재 여부 확인
	hasToken: (): boolean => {
		return !!AuthStorage.getAccessToken()
	},
}

// 인증 상태 관리
export const AuthUtils = {
	// 로그인 여부 확인
	isAuthenticated: (): boolean => {
		return AuthStorage.hasToken()
	},

	// OAuth 성공 후 토큰 처리
	handleOAuthSuccess: (token: string) => {
		AuthStorage.setAccessToken(token)
		console.log('✅ 로그인 성공. 토큰 저장 완료')
	},

	// URL에서 토큰 파싱
	parseTokenFromUrl: (): string | null => {
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search)
			return params.get('accessToken')
		}
		return null
	},
}
