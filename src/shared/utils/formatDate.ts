export const formatUTCPlus9Date = (dateString: string) => {
	const utcPlus9Date = new Date(dateString)
	utcPlus9Date.setHours(utcPlus9Date.getHours() + 9)
	const year = utcPlus9Date.getFullYear()
	const month = String(utcPlus9Date.getMonth() + 1).padStart(2, '0')
	const day = String(utcPlus9Date.getDate()).padStart(2, '0')
	const hours = String(utcPlus9Date.getHours()).padStart(2, '0')
	const minutes = String(utcPlus9Date.getMinutes()).padStart(2, '0')

	return `${year}년 ${month}월 ${day}일 ${Number(hours) < 12 ? '오전' : '오후'} ${hours}:${minutes}`
}
