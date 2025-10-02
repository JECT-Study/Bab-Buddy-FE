import Header from '@/shared/components/Header'

export default function GroupLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className="bg-gray-5 flex min-h-screen w-full flex-1 flex-col">
			<Header />
			<div className="flex w-full justify-center">
				<section className="flex w-full min-w-[640px] rounded-[28px] pt-[60px] pr-[70px] pb-[129px] pl-[95px]">
					{children}
				</section>
			</div>
		</main>
	)
}
