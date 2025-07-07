import clsx from 'clsx'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'

const logoFont = localFont({
	src: '../../app/fonts/TJJoyofsingingB_TTF.ttf',
	display: 'swap',
})

// todo :: href 확인 필요
const navLinks = [
	{ href: '/foodServey', label: '개인메뉴 추천' },
	{ href: '/group', label: '그룹메뉴 추천' },
	{ href: '/myInfo', label: '마이페이지' },
]

export default function Header() {
	return (
		<header className="flex items-center justify-between px-[72px] py-8">
			<Link href="/" className="flex items-center gap-2">
				<Image src="/assets/logo.svg" alt="로고" width={43} height={43} />
				<strong className={clsx(logoFont.className, 'text-orange text-4xl font-bold')}>
					밥버디
				</strong>
			</Link>
			<nav className="flex gap-4">
				{navLinks.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className={clsx(
							'text-b2-medium rounded-2xl px-4 py-2 text-gray-50 transition-colors duration-200',
							'hover:text-orange hover:bg-orange/10',
						)}
					>
						{link.label}
					</Link>
				))}
			</nav>
		</header>
	)
}
