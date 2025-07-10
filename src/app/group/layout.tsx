import Header from '@/shared/components/Header'

export default function GroupLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className="bg-gray-5 flex min-h-screen flex-1 flex-col gap-12">
			<Header />
			<div className="flex justify-center">
				<section className="flex w-3/4 min-w-[640px] flex-col rounded-[28px] bg-white p-6">
					{children}
				</section>
			</div>
		</main>
	)
}
