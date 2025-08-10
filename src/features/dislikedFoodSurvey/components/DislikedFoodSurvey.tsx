import React, { useState } from 'react'
import Icon from '@/shared/components/Icon'
import { DislikedFoodInput } from '@/features/dislikedFoodInput/components/DislikedFoodInput'
import { useDislikedFoods } from '@/features/dislikedFoodInput/hooks/useDislikedFoods'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from '@/features/myInfo/api/user'

const DislikedFoodSurvey: React.FC = () => {
	const { foods, handleAddFood, handleRemoveFood } = useDislikedFoods()
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const handleCompleteOnboarding = async () => {
		try {
			setIsLoading(true)
			await completeOnboarding()
			console.log('✅ 온보딩 완료: /home으로 이동')
			router.push('/home')
		} catch (error) {
			console.error('❌ 온보딩 완료 처리 실패:', error)
			// 에러 발생 시에도 홈으로 이동 (사용자 경험을 위해)
			router.push('/home')
		} finally {
			setIsLoading(false)
		}
	}

	const onClickNextStep = () => {
		handleCompleteOnboarding()
	}

	return (
		<div className="flex-1">
			<main className="mx-auto flex h-[calc(100vh-110px)] w-full max-w-5xl flex-1 flex-col items-center gap-[48px] overflow-auto pb-[90px]">
				{/* 상단 제목 */}
				<div className="flex h-[82px] flex-col items-center gap-4">
					<div className="text-h2-bold text-center">특별히 싫어하시는 음식이 있으신가요?</div>
					<div className="text-b2-medium text-gray-30 mb-8 h-[54px] text-center">
						(결과에서 제외될 음식을 20개까지 등록 가능합니다.)
					</div>
				</div>

				<div className="flex h-full w-full flex-1 items-end gap-4">
					{/* 왼쪽 버튼 */}
					<div className="flex h-full flex-col justify-end">
						<button
							className="text-orientation-mixed text-orange bg-transparent font-medium"
							onClick={onClickNextStep}
							disabled={isLoading}
						>
							{isLoading ? '처리중...' : '건너뛰기'}
						</button>
					</div>

					{/* 중앙 컨텐츠 */}
					<div className="flex h-full w-full flex-1 flex-col overflow-y-auto">
						<DislikedFoodInput
							foods={foods}
							onAddFood={handleAddFood}
							onRemoveFood={handleRemoveFood}
						/>
					</div>

					{/* 오른쪽 버튼 */}
					<div className="flex h-full flex-col justify-end">
						<button
							className={`flex items-center font-medium ${
								foods.length === 0 ? 'text-gray-30' : 'text-orange'
							}`}
							disabled={foods.length === 0 || isLoading}
							onClick={onClickNextStep}
						>
							{isLoading ? '처리중...' : '다음단계'}
							<Icon.ArrowRight
								className={`${foods.length === 0 ? 'text-gray-30' : 'text-orange'}`}
							/>
						</button>
					</div>
				</div>
			</main>
		</div>
	)
}

export default DislikedFoodSurvey
