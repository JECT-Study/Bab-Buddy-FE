interface Location {
	lat: number
	lng: number
}

/**
 * 두 지점 간의 거리를 계산합니다 (하버사인 공식 사용)
 * @param point1 첫 번째 위치 (위도, 경도)
 * @param point2 두 번째 위치 (위도, 경도)
 * @returns 거리 (미터 단위)
 */
export const calculateDistance = (point1: Location, point2: Location): number => {
	const R = 6371e3 // 지구의 반경 (미터)
	const φ1 = (point1.lat * Math.PI) / 180
	const φ2 = (point2.lat * Math.PI) / 180
	const Δφ = ((point2.lat - point1.lat) * Math.PI) / 180
	const Δλ = ((point2.lng - point1.lng) * Math.PI) / 180

	const a =
		Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
		Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

	return R * c
}

/**
 * 거리를 사용자 친화적인 문자열로 변환합니다
 * @param meters 미터 단위의 거리
 * @returns 포맷팅된 거리 문자열
 */
export const formatDistance = (meters: number): string => {
	if (meters < 1000) {
		return `${Math.round(meters)}m`
	}
	return `${(meters / 1000).toFixed(1)}km`
}
