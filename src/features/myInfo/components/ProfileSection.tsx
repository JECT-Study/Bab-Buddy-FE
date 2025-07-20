import React from 'react'

export const ProfileSection: React.FC = () => {
	return (
		<div className="border-gray-10 flex flex-col gap-6 rounded-3xl border bg-white p-6">
			<h2 className="text-h3-bold text-black">프로필 정보</h2>

			<div className="flex items-center gap-4">
				<div className="h-[69px] w-[69px] rounded-full bg-gray-200" />

				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<span className="text-h3-bold text-black">밥버디</span>
					</div>
					<div className="flex h-[23px] gap-1">
						<div className="flex items-center justify-center rounded-[20px] border border-gray-50 px-[10px]">
							<span className="font-size-[16px] text-b2-medium text-gray-50">카카오 계정</span>
						</div>
						<span className="font-size-[15px] text-b3-medium text-gray-30 text-center">
							user@kakao.com
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
