import Script from 'next/script'
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk'
import { MarkerPin } from '@/features/kakaoMap/components/MarkerPin'

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
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`

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
				{restaurants.map((restaurant, index) => (
					<CustomOverlayMap key={restaurant.id} position={restaurant.location} yAnchor={1}>
						<MarkerPin number={index + 1} />
					</CustomOverlayMap>
				))}
			</Map>
		</>
	)
}

export default KakaoMap
