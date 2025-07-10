import GroupEmpty from '@/features/group/components/GroupEmpty'
import Icon from '@/shared/components/Icon'
import Link from 'next/link'

export default function GroupPage() {
	return (
		<>
			<Link href="/" className="text-b1-medium text-orange flex items-center gap-1 px-6">
				<Icon.ArrowForward />
				메인 화면으로 돌아가기
			</Link>
			<div className="flex flex-1 flex-col items-center gap-6 py-6">
				<h2 className="text-h2-bold">모두와 함께 음식 정하기</h2>
				<article className="mb-6 flex w-[640px] flex-1 flex-col">
					<strong className="text-b1-bold">최근 생성된 그룹방</strong>
					<GroupEmpty />
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
