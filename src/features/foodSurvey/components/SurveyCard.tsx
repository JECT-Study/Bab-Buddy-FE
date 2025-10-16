import React from 'react'
import Icon from '@/shared/components/Icon'
import type { FoodSurveyIconType } from '../types/foodSurveyTypes'

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
				isSelected ? 'border-[#EA580C] bg-[#FEF7F3]' : 'border-gray-30 bg-white'
			}`}
		>
			<div className="text-b2-bold lg:text-h3-medium relative z-10 min-h-[70px] text-gray-100">
				<div>{label}</div>
				<div>{sublabel}</div>
			</div>

			<div className="absolute right-6 bottom-6 z-0 h-20 w-20">
				<Icon.FoodSurveyIcon size={'100%'} type={icon} />
			</div>
		</div>
	)
}

export default SurveyCard
