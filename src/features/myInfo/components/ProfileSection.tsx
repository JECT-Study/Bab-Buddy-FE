import React, { useEffect, useState } from 'react'
import { getUserInfo } from '../api/user'
import { User } from '../types/user'
import Image from 'next/image'

export const ProfileSection: React.FC = () => {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const data = await getUserInfo()
				setUser(data)
			} catch (err) {
				console.error('Failed to fetch user info:', err)
			}
		}

		fetchUserInfo()
	}, [])

	if (!user) return null

	return (
		<div className="border-gray-10 flex flex-col gap-6 rounded-3xl border bg-white p-6">
			<h2 className="text-h3-bold text-black">프로필 정보</h2>

			<div className="flex items-center gap-4">
				<div className="h-[69px] w-[69px] overflow-hidden rounded-full bg-gray-200">
					{user.profile ? (
						<Image
							src={user.profile}
							alt="profile"
							width={69}
							height={69}
							className="object-cover"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center text-gray-400">
							<div className="h-[69px] w-[69px] rounded-full bg-gray-200" />
						</div>
					)}
				</div>

				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<span className="text-h3-bold text-black">{user.name}</span>
					</div>
					<div className="flex h-[23px] gap-1">
						<div className="flex items-center justify-center rounded-[20px] border border-gray-50 px-[10px]">
							<span className="font-size-[16px] text-b2-medium text-gray-50">카카오 계정</span>
						</div>
						<span className="font-size-[15px] text-b3-medium text-gray-30 text-center">
							{user.email}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
