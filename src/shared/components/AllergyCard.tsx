import React from 'react'

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
		className={`flex h-[72px] min-w-[360px] cursor-pointer items-center rounded-[20px] border bg-white px-6 py-4 transition ${
			checked ? 'border-gray-100' : 'border-gray-10'
		} `}
	>
		{checked && (
			<span className="mr-4 flex h-[20px] w-[20px] items-center justify-between">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
				>
					<g clip-path="url(#clip0_416_6904)">
						<path
							d="M8.44444 11.5556L6.05555 9.16667C5.85185 8.96296 5.59259 8.86111 5.27778 8.86111C4.96296 8.86111 4.7037 8.96296 4.5 9.16667C4.2963 9.37037 4.19444 9.62963 4.19444 9.94444C4.19444 10.2593 4.2963 10.5185 4.5 10.7222L7.66667 13.8889C7.88889 14.1111 8.14815 14.2222 8.44444 14.2222C8.74074 14.2222 9 14.1111 9.22222 13.8889L15.5 7.61111C15.7037 7.40741 15.8056 7.14815 15.8056 6.83333C15.8056 6.51852 15.7037 6.25926 15.5 6.05555C15.2963 5.85185 15.037 5.75 14.7222 5.75C14.4074 5.75 14.1481 5.85185 13.9444 6.05555L8.44444 11.5556ZM2.22222 20C1.61111 20 1.08815 19.7826 0.653333 19.3478C0.218519 18.913 0.000740741 18.3896 0 17.7778V2.22222C0 1.61111 0.217778 1.08815 0.653333 0.653333C1.08889 0.218519 1.61185 0.000740741 2.22222 0H17.7778C18.3889 0 18.9122 0.217778 19.3478 0.653333C19.7833 1.08889 20.0007 1.61185 20 2.22222V17.7778C20 18.3889 19.7826 18.9122 19.3478 19.3478C18.913 19.7833 18.3896 20.0007 17.7778 20H2.22222Z"
							fill="black"
						/>
					</g>
					<defs>
						<clipPath id="clip0_416_6904">
							<rect width="20" height="20" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</span>
		)}
		{!checked && (
			<span className="border-gray-30 mr-4 flex h-[20px] w-[20px] items-center justify-between rounded border bg-white"></span>
		)}

		<div className="flex min-w-0 flex-1 justify-between">
			<span className="text-b1-bold truncate">{label}</span>
			<span className="text-b1-medium text-gray-30 truncate">{description}</span>
		</div>
	</button>
)
