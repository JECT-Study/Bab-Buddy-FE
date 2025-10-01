export const kakaoMapOpen = (name: string, lat: number, lng: number, zoomLevel: number = 3) => {
	const isValidNumber = (v: unknown) => typeof v === 'number' && isFinite(v)
	const encodedName = encodeURIComponent(name)

	// lat(y), lng(x) 순서가 맞는지 확인 (카카오: 위도,경도)
	if (!isValidNumber(lat) || !isValidNumber(lng)) {
		// 좌표가 유효하지 않으면 검색으로 대체
		const q = encodeURIComponent(name)
		window.open(`https://map.kakao.com/link/search/${q}`, '_blank')
		return
	}

	const y = encodeURIComponent(lat)
	const x = encodeURIComponent(lng)
	const level = Math.max(1, Math.min(10, Math.floor(zoomLevel)))

	// 마커가 표시되도록 link/to 사용 + 줌 레벨 지정
	window.open(`https://map.kakao.com/link/to/${encodedName},${y},${x}?map_level=${level}`, '_blank')
}
