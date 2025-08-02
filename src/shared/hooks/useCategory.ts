export const getConvertCategory = (category: string) => {
	switch (category) {
		case '전체':
			return 'ALL'
		case '한식':
			return 'KOREAN'
		case '중식':
			return 'CHINESE'
		case '일식':
			return 'JAPANESE'
		case '양식':
			return 'WESTERN'
		default:
			return 'ETC'
	}
}
