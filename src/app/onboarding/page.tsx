'use client'

import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
	const router = useRouter()

	const handleSkipSurvey = () => {
		// 설문 건너뛰기 - 바로 홈으로 이동
		router.push('/home')
	}

	const handleStartSurvey = () => {
		// 설문 시작 - 알레르기 설문으로 이동
		router.push('/allergySurvey')
	}

	return (
		<div className="flex min-h-screen w-screen flex-col overflow-hidden md:flex-row">
			{/* 좌측 캐릭터 영역 - lg 이상에서만 표시 */}
			<div className="relative hidden w-full min-w-[550px] overflow-hidden bg-gray-100 lg:block lg:h-screen lg:flex-4">
				<div className="absolute -right-20 -bottom-32 aspect-[685.35/685.35] h-[685.354px] w-[685.354px] shrink-0 rotate-[-14.526deg]">
					<video
						className="absolute inset-0 h-full w-full object-contain"
						autoPlay
						loop
						muted
						playsInline
						preload="auto"
					>
						<source src="/assets/video/onBoarding.mp4" type="video/mp4" />
						밥버디 캐릭터
					</video>
				</div>
			</div>

			{/* 우측 콘텐츠 영역 */}
			<div className="flex h-screen w-full flex-col items-center justify-center bg-white px-8 md:flex-5">
				<div className="flex w-full flex-col items-center justify-center gap-[12px] text-center">
					<div>
						<p className="text-h2-bold text-gray-100">딱 맞는 추천을 위해, 간단한 설문이 있어요</p>

						<p className="text-body1 text-gray-100">
							알레르기나 못 먹는 음식이 있다면 알려주세요.
							<br />
							없다면 바로 넘어가도 괜찮아요 😊
						</p>
					</div>

					{/* 버튼 영역 */}
					<div className="w-1/3 space-y-4">
						{/* 설문 건너뛰기 버튼 */}
						<button
							onClick={handleSkipSurvey}
							className="text-body1 bg-gray-5 w-full rounded-[50px] px-8 py-4 font-medium text-gray-50 transition-colors hover:bg-gray-200"
						>
							설문 건너뛰기
						</button>

						{/* 설문 하러가기 버튼 */}
						<button
							onClick={handleStartSurvey}
							className="text-body1 w-full rounded-[50px] bg-orange-500 px-8 py-4 font-medium text-white transition-colors hover:bg-orange-600"
						>
							설문 하러가기
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
