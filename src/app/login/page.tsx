import Image from 'next/image'

export default function LoginPage() {
	return (
		<div className="flex min-h-screen w-screen overflow-hidden">
			<div className="relative flex h-screen flex-1 flex-col items-end justify-start overflow-hidden bg-[#F76D35]">
				<Image
					src="/login.svg"
					alt="밥버디 캐릭터"
					fill
					style={{ objectFit: 'contain', objectPosition: 'left bottom' }}
					priority
				/>
			</div>
			{/* 우측: 텍스트, 설명, 카카오 로그인 버튼 */}
			<div className="flex h-screen flex-1 flex-col items-center justify-center bg-white">
				<h1 className="text-h1 mb-4 text-center font-bold">오늘 뭐 먹을지 고민 중이신가요?</h1>
				<p className="text-body2 mb-8 text-center text-gray-500">
					입맛 따라 기본 메뉴, 메뉴 추천 도와드릴게요 :)
				</p>
				<button type="submit" className="cursor-pointer flex items-center gap-2 rounded-full bg-[#FDDC3F] px-8 py-3 font-semibold text-gray-900 shadow transition hover:bg-yellow-300">
					<Image src="/kakao.svg" alt="카카오" width={24} height={24} />
					카카오로 로그인
				</button>
			</div>
		</div>
	)
}
