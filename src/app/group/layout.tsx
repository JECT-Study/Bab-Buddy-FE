import Header from '@/shared/components/Header'

export default function GroupLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className="bg-gray-5 flex min-h-screen w-full flex-1 flex-col">
			<Header />
			<section className="flex w-full min-w-[640px] justify-center rounded-[28px] pt-12 pr-[70px] pl-[95px]">
				{children}
			</section>
		</main>
	)
}
