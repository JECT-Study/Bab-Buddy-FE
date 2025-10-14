import { memo } from 'react'

interface FoodCardProps {
	index: 2 | 3
	userName: string
	food: string
}

export const FoodCard = memo((props: FoodCardProps) => {
	return (
		<div className="bg-gray-5 flex-1 rounded-[24px] p-[24px]">
			<div className="text-h2-bold">
				{props.userName}님께 딱맞춘{' '}
				<span className="text-orange">{props.index === 2 ? '두' : '세'}번째 메뉴</span>
			</div>
			<div className="text-h1-bold">{props.food}</div>
		</div>
	)
})
FoodCard.displayName = 'FoodCard'
