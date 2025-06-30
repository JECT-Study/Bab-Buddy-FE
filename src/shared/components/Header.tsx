import clsx from 'clsx'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'

const logoFont = localFont({
	src: '../../app/fonts/TJJoyofsingingB_TTF.ttf',
	display: 'swap',
})

// todo :: 로고 색상 확인

export default function Header() {
	return (
		<header className="flex justify-between items-center px-[72px] py-8">
			<Link href="/" className="flex items-center gap-2">
				<Image src="/assets/logo.svg" alt="로고" width={43} height={43} />
				<p className={clsx(logoFont.className, 'text-orange-40 font-bold text-4xl')}>밥버디</p>
			</Link>
			<Link href={''} className="px-4 py-2 text-body2 font-medium">
				마이페이지
			</Link>
		</header>
	)
}
