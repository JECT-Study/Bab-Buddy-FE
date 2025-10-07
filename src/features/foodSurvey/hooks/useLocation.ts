import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocationStore } from '@/shared/store/locationStore'
import { getAddressFromCoords } from '@/features/foodSurvey/api/addressApi'
import { useFoodSurveyStore } from '@/features/foodSurvey/store/foodSurveyStore'

export const useLocation = () => {
	const { setLocation } = useLocationStore()
	const { setAddress } = useFoodSurveyStore()
	const router = useRouter()

	const [showLocationModal, setShowLocationModal] = useState(false)
	const [hasRequestedPermission, setHasRequestedPermission] = useState(false)

	const checkLocationPermission = async () => {
		try {
			const result = await navigator.permissions.query({ name: 'geolocation' })

			if (result.state === 'granted') {
				// 권한이 있으면 현재 위치 가져오기
				console.log('granted')
				requestLocation()
			}
		} catch (error) {
			console.error('권한 확인 실패:', error)
		} finally {
		}
	}

	// Get user's location and address
	const requestLocation = async () => {
		if (!navigator.geolocation) {
			console.error('Geolocation is not supported by this browser.')
			return
		}

		try {
			const position = await new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject, {
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0,
				})
			})

			const { latitude, longitude } = position.coords
			setLocation({ lat: latitude, lng: longitude })
			const response = await getAddressFromCoords(latitude, longitude)
			if (response.address) {
				setAddress(response.address)
			}
		} catch (error) {
			console.error('Error in getAddress:', error)
			// 위치 권한이 거부된 경우 사용자에게 알림
			if ((error as GeolocationPositionError).code === 1) {
				console.log('사용자가 위치 권한을 거부했습니다.')
			}
		}
	}

	const handleAcceptLocation = () => {
		setShowLocationModal(false)
		setHasRequestedPermission(true)
		requestLocation()
	}

	const handleDenyLocation = () => {
		setShowLocationModal(false)
		setHasRequestedPermission(true)
		router.push('/home') // 메인 화면으로 강제 이동
	}

	return {
		hasRequestedPermission,
		showLocationModal,
		checkLocationPermission,
		setShowLocationModal,
		handleDenyLocation,
		handleAcceptLocation,
	}
}
