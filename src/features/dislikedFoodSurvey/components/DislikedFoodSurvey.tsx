import React, { useState } from 'react'
import Icon from '@/shared/components/Icon'
import { DislikedFoodInput } from '@/shared/components/DislikedFoodInput'

const DislikedFoodSurvey: React.FC = () => {
	const [selectedFoods, setSelectedFoods] = useState<string[]>([])

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
						<button className="text-orientation-mixed text-orange bg-transparent font-medium">
							건너뛰기
						</button>
					</div>

					{/* 중앙 컨텐츠 */}
					<div className="flex h-full w-full flex-1 flex-col overflow-y-auto">
						<DislikedFoodInput foods={selectedFoods} onFoodsChange={setSelectedFoods} />
					</div>

					{/* 오른쪽 버튼 */}
					<div className="flex h-full flex-col justify-end">
						<button
							className={`flex items-center font-medium ${
								selectedFoods.length === 0 ? 'text-gray-30' : 'text-orange'
							}`}
							disabled={selectedFoods.length === 0}
						>
							다음단계
							<Icon.ArrowRight
								className={`${selectedFoods.length === 0 ? 'text-gray-30' : 'text-orange'}`}
							/>
						</button>
					</div>
				</div>
			</main>
		</div>
	)
}

export default DislikedFoodSurvey
