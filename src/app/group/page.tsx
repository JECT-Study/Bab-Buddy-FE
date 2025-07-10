import Icon from '@/shared/components/Icon'
import Image from 'next/image'

export default function GroupPage() {
	return (
		<>
			<div className="text-b1-medium text-orange">메인 화면으로 돌아가기</div>
			<div className="flex flex-1 flex-col items-center gap-6 py-6">
				<h2 className="text-h2-bold">모두와 함께 음식 정하기</h2>
				<article className="mb-6 flex w-[640px] flex-1 flex-col">
					<strong className="text-b1-bold">최근 생성된 그룹방</strong>

					<div className="flex flex-col items-center">
						<Image
							src="/assets/images/groupVote-blank-babbuddy.webp"
							alt="밥버디 캐릭터"
							width={442}
							height={262}
							className="my-12"
						/>
						<div className="flex flex-col items-center gap-2">
							<p className="text-b1-medium">그룹방이 텅 비었어요 새로운 방을 생성해보세요</p>
							<span className="text-caption-medium text-gray-30 flex cursor-pointer items-center gap-2">
								<Icon.InfoOutline />
								모두와 함께 메뉴 정하기 가이드
							</span>
						</div>
					</div>
				</article>

				<button
					type="button"
					className="bg-orange text-h3-medium flex w-[640px] flex-1 justify-center rounded-3xl px-9 py-4 text-white"
				>
					새 그룹 만들기
				</button>
			</div>
		</>
	)
}
