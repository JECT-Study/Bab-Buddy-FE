'use client'
import clsx from 'clsx'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AuthUtils } from '@/shared/utils/auth'
import { logout } from '@/shared/api/auth'

const logoFont = localFont({
	src: '../../app/fonts/TJJoyofsingingB_TTF.ttf',
	display: 'swap',
})

// todo :: href 확인 필요
const navLinks = [
	{ href: '/foodSurvey', label: '개인메뉴 추천' },
	{ href: '/group', label: '그룹메뉴 추천' },
	{ href: '/myInfo', label: '마이페이지' },
]

export default function Header() {
	const pathname = usePathname()
	const isLogin = pathname === '/login'
	const [, setIsAuthenticated] = useState(false)

	useEffect(() => {
		// 클라이언트 사이드에서 인증 상태 확인
		setIsAuthenticated(AuthUtils.isAuthenticated())
	}, [])

	const handleLogout = async () => {
		if (confirm('로그아웃 하시겠습니까?')) {
			logout()
		}
	}

	if (isLogin) return null
	return (
		<header className="flex items-center justify-between px-[72px] py-8">
			<Link href="/" className="flex items-center gap-2">
				<Image src="/assets/icons/logo.svg" alt="로고" width={43} height={43} />
				<strong className={clsx(logoFont.className, 'text-orange text-4xl font-bold')}>
					밥버디
				</strong>
			</Link>
			<nav className="flex items-center gap-4">
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

				<button
					onClick={handleLogout}
					className="text-b2-medium hover:text-orange hover:bg-orange/10 rounded-2xl px-4 py-2 text-gray-700 transition-colors duration-200"
				>
					로그아웃
				</button>
			</nav>
		</header>
	)
}
