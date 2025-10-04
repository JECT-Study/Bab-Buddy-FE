import Header from '@/shared/components/Header'

export default function GroupLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main
			className="flex min-h-screen w-full flex-1 flex-col bg-[var(--bg)] text-[var(--text)]"
			data-surface="group"
		>
			<Header />
			<section className="flex w-full min-w-[640px] justify-center rounded-[28px] pt-12 pr-[70px] pl-[95px]">
				{children}
			</section>
		</main>
	)
}
