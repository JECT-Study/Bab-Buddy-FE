import { useEffect, useRef } from 'react'
import { MarkerPin } from './MarkerPin'
import { createRoot } from 'react-dom/client'

interface KakaoMapProps {
	restaurants: {
		id: number
		rank: number
		name: string
		location: {
			lat: number
			lng: number
		}
	}[]
}

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`

const KakaoMap = ({ restaurants }: KakaoMapProps) => {
	const mapRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const script = document.createElement('script')
		script.src = KAKAO_SDK_URL
		script.async = true
		script.onload = () => {
			window.kakao.maps.load(() => {
				if (!mapRef.current) return
				const defaultLocation = {
					lat: 37.566826,
					lng: 126.9786567,
				}
				const lat = restaurants?.[0]?.location.lat ?? defaultLocation.lat
				const lng = restaurants?.[0]?.location.lng ?? defaultLocation.lng

				const map = new window.kakao.maps.Map(mapRef.current, {
					center: new window.kakao.maps.LatLng(lat, lng),
					level: 5,
				})

				// 현재 위치 마커용 컨테이너
				const currentLocationContainer = document.createElement('div')
				const currentLocationRoot = createRoot(currentLocationContainer)
				currentLocationRoot.render(<MarkerPin number={0} />)

				// 식당 마커들
				restaurants.forEach((restaurant) => {
					const position = new window.kakao.maps.LatLng(
						restaurant.location.lat,
						restaurant.location.lng,
					)

					const customOverlay = new window.kakao.maps.CustomOverlay({
						position,
						map: map,
						yAnchor: 1,
					})

					// 마커 컨테이너 생성
					const container = document.createElement('div')
					const root = createRoot(container)
					root.render(<MarkerPin number={restaurant.rank} />)
					customOverlay.setContent(container)
				})
			})
		}

		document.head.appendChild(script)

		return () => {
			document.head.removeChild(script)
		}
	}, [restaurants])

	return <div ref={mapRef} className="h-full w-full rounded-[24px]" />
}

export default KakaoMap
