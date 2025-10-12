import React from 'react'
import Icon from './Icon'

interface AllergyCardProps {
	checked: boolean
	label: string
	description: string
	onClick: () => void
}

export const AllergyCard: React.FC<AllergyCardProps> = ({
	checked,
	label,
	description,
	onClick,
}) => (
	<button
		type="button"
		onClick={onClick}
		className={`flex h-auto min-h-[72px] min-w-[360px] cursor-pointer flex-col items-start rounded-[24px] border bg-white px-6 py-6 transition ${
			checked ? 'border-gray-100' : 'border-gray-10'
		} `}
	>
		<div className="flex w-full flex-1 items-center justify-between self-stretch">
			<div className="flex items-center">
				{checked && (
					<span className="mr-3 flex h-[20px] w-[20px] items-center justify-center">
						<Icon.Checkbox size={20} />
					</span>
				)}
				{!checked && (
					<span className="border-gray-30 mr-3 flex h-[20px] w-[20px] items-center justify-center rounded border bg-white"></span>
				)}
				<span className="text-b1-bold text-gray-100">{label}</span>
			</div>

			<div className="text-right">
				<span className="text-b1-medium text-gray-30">{description}</span>
			</div>
		</div>
	</button>
)
