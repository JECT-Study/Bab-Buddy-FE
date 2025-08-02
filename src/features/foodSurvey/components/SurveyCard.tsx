import React from 'react'
import Icon from '@/shared/components/Icon'
import { FoodSurveyIconType } from '../types/foodSurveyTypes'

interface SurveyCardProps {
	id: string
	label: string
	sublabel: string
	icon: FoodSurveyIconType
	isSelected: boolean
	onClick: (id: string) => void
}

export const SurveyCard: React.FC<SurveyCardProps> = ({
	id,
	label,
	sublabel,
	icon,
	isSelected,
	onClick,
}) => {
	return (
		<div
			onClick={() => onClick(id)}
			className={`relative flex min-h-[150px] cursor-pointer flex-col justify-between overflow-hidden rounded-[24px] border-1 p-6 ${
				isSelected ? 'border-orange' : 'border-gray-30 bg-white'
			}`}
		>
			{/* 텍스트 (왼쪽 위 정렬) */}
			<div className="text-h3-medium">
				<div>{label}</div>
				<div>{sublabel}</div>
			</div>

			{/* 아이콘 (오른쪽 아래 정렬, flexbox 사용) */}
			<div className="flex items-end justify-end">
				<Icon.FoodSurveyIcon size={`100%`} type={icon} />
			</div>
		</div>
	)
}

export default SurveyCard
