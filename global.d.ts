export {}

declare global {
	interface Window {
		kakao: any
	}
}
// 'react' 모듈을 확장하여 CSSProperties에 사용자 정의 속성을 추가합니다.
declare module 'react' {
	interface CSSProperties extends React.CSSProperties {
		/**
		 * TypeScript에게 모든 CSS 변수 (하이픈 두 개로 시작하는 --*)가 유효한
		 * 스타일 속성임을 알려 오류를 제거합니다.
		 */
		[key: `--${string}`]: string | number | undefined
	}
}
