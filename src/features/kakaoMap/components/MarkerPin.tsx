import Icon from '@/shared/components/Icon'

interface MarkerPinProps {
	number: number
}

export const MarkerPin = ({ number }: MarkerPinProps) => {
	return (
		<div className="flex flex-col items-center">
			<div className="relative flex h-[45px] w-[34px] items-center justify-center">
				<svg
					width="34"
					height="45"
					viewBox="0 0 35 41"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="absolute"
				>
					<path
						d="M17.5996 0C22.096 4.4497e-07 26.0538 1.57377 29.4736 4.7207C32.8935 7.86775 34.6024 12.0935 34.5996 17.3975C34.5996 18.9885 34.2899 20.6593 33.6709 22.4102C33.0518 24.1612 32.1491 25.983 30.9619 27.874C29.7748 29.765 28.2952 31.7179 26.5244 33.7334C24.7536 35.7489 22.7171 37.8179 20.415 39.9395C20.0255 40.2929 19.5826 40.5576 19.0869 40.7344C18.5911 40.9112 18.0954 41 17.5996 41C17.1038 41 16.6081 40.9112 16.1123 40.7344C15.6166 40.5576 15.1737 40.2929 14.7842 39.9395C12.4821 37.8179 10.4456 35.7489 8.6748 33.7334C6.90399 31.7179 5.425 29.7651 4.23926 27.874C3.05351 25.983 2.15077 24.1612 1.53027 22.4102C0.909893 20.6594 0.599649 18.9885 0.599609 17.3975C0.599609 12.0935 2.30912 7.86775 5.72754 4.7207C9.14593 1.57372 13.1032 0 17.5996 0Z"
						fill="black"
					/>
				</svg>
				<span className="relative z-10 text-lg font-bold text-white">{number}</span>
			</div>
			<Icon.MarkerPinShadow />
		</div>
	)
}
