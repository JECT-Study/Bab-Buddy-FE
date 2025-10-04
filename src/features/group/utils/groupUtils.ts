// 마지막 한글 음절의 받침 유무로 '이/가' 결정
export const getLastKoreanLetter = (word: string): string => {
	const s = (word ?? '').trim()
	// 뒤에서부터 마지막 '한글 음절(가~힣)' 찾기
	for (let i = s.length - 1; i >= 0; i--) {
		const code = s.charCodeAt(i)
		// 가~힣 범위에 해당하는 글자인지 확인
		if (code >= 0xac00 && code <= 0xd7a3) {
			// 받침 유무에 따라 '이/가' 결정
			// (code - oxac00) % 28이 0이면 받침 없음
			const jong = (code - 0xac00) % 28
			return jong === 0 ? '가' : '이'
		}
	}
	// 한글이 없으면 기본 '가'
	return '가'
}
