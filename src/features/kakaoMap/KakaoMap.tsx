import Script from 'next/script'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`

interface KakaoMapProps {
	currentLocation: {
		lat: number
		lng: number
	}
	restaurants: {
		id: number
		name: string
		location: {
			lat: number
			lng: number
		}
	}[]
}

const KakaoMap = ({ currentLocation, restaurants }: KakaoMapProps) => {
	return (
		<>
			<Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
			<Map
				center={{
					lat: currentLocation.lat,
					lng: currentLocation.lng,
				}}
				style={{
					width: '100%',
					height: '100%',
				}}
				level={4}
			>
				{/* 식당 위치 마커 */}
				{restaurants.map((restaurant) => (
					<MapMarker key={restaurant.id} position={restaurant.location}>
						<div className="rounded bg-white px-2 py-1 text-sm">{restaurant.name}</div>
					</MapMarker>
				))}
			</Map>
		</>
	)
}

export default KakaoMap
