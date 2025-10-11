import Header from '@/shared/components/Header'

export default function RouletteLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="bg-gray-5 min-h-screen">
			<Header />
			{children}
		</div>
	)
}
