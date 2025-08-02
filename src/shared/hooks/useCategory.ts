export const getConvertCategory = (category: string) => {
	switch (category) {
		case '전체':
			return 'ALL'
		case '한식':
			return 'korean'
		case '중식':
			return 'chinese'
		case '일식':
			return 'japanese'
		case '양식':
			return 'western'
		default:
			return 'etc'
	}
}
