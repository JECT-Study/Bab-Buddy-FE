export const kakaoMapOpen = (name: string, lat: number, lng: number) => {
	const encodedName = encodeURIComponent(name)
	const encodedLat = encodeURIComponent(lat)
	const encodedLng = encodeURIComponent(lng)

	window.open(`https://map.kakao.com/link/map/${encodedName},${encodedLat},${encodedLng}`, '_blank')
}
