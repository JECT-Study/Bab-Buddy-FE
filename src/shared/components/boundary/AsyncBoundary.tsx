import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'

interface AsyncBoundaryProps {
	children: React.ReactNode
	errorFallback?: React.ReactNode
	loadingFallback?: React.ReactNode
}

export default function AsyncBoundary({
	children,
	errorFallback,
	loadingFallback,
}: AsyncBoundaryProps) {
	return (
		<ErrorBoundary fallback={errorFallback ?? <div>Error</div>}>
			<Suspense fallback={loadingFallback ?? <div>Loading...</div>}>{children}</Suspense>
		</ErrorBoundary>
	)
}
