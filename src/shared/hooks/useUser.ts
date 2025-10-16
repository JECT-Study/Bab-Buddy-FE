'use client'

import { useState, useEffect } from 'react'
import { getUserInfo } from '@/features/myInfo/api/user'
import type { ExtendedUser } from '@/features/myInfo/types/user'

export const useUser = () => {
	const [user, setUser] = useState<ExtendedUser | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				setLoading(true)
				const userData = await getUserInfo()
				setUser(userData as ExtendedUser)
			} catch (err) {
				setError(err as Error)
			} finally {
				setLoading(false)
			}
		}

		fetchUser()
	}, [])

	return { user, loading, error }
}
