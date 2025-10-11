import React from 'react'

interface LocationPermissionModalProps {
	isOpen: boolean
	onAccept: () => void
	onDeny: () => void
}

export const LocationPermissionModal: React.FC<LocationPermissionModalProps> = ({
	isOpen,
	onAccept,
	onDeny,
}) => {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
				{/* 아이콘 */}
				<div className="mb-4 flex justify-center">
					<div className="bg-orange/10 flex h-16 w-16 items-center justify-center rounded-full">
						<svg
							className="text-orange h-8 w-8"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					</div>
				</div>

				{/* 제목 */}
				<h2 className="mb-3 text-center text-xl font-bold text-gray-900">
					위치 정보 접근 권한이 필요해요
				</h2>

				{/* 설명 */}
				<div className="mb-6 space-y-2 text-center text-sm text-gray-600">
					<p>현재 위치를 기반으로</p>
					<p className="font-medium text-gray-800">
						주변 맛집을 추천해드리기 위해 위치 정보가 필요합니다
					</p>
				</div>

				{/* 안내 사항 */}
				<div className="bg-gray-10 mb-6 rounded-lg p-4">
					<ul className="space-y-2 text-xs text-gray-600">
						<li className="flex items-start">
							<span className="text-orange mr-2">•</span>
							<span>위치 정보는 맛집 추천 목적으로만 사용됩니다</span>
						</li>
					</ul>
				</div>

				{/* 버튼 */}
				<div className="flex gap-3">
					<button
						onClick={onDeny}
						className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
					>
						거부
					</button>
					<button
						onClick={onAccept}
						className="bg-orange hover:bg-orange/90 flex-1 rounded-lg px-4 py-3 font-medium text-white transition-colors"
					>
						허용
					</button>
				</div>
			</div>
		</div>
	)
}
