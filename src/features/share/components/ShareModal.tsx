'use client'

import React, { useRef } from 'react'
import Icon from '@/shared/components/Icon'
import Image from 'next/image'
import { useOnPressEsc } from '@/shared/hooks/useOnPressEsc'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'

interface ShareModalProps {
	title?: string
	isOpen: boolean
	onClose: () => void
	onKakaoShare: () => void
	onLinkShare: () => void
}

export const ShareModal: React.FC<ShareModalProps> = ({
	title = '링크를 공유해 결과를 공유하세요',
	isOpen,
	onClose,
	onKakaoShare,
	onLinkShare,
}) => {
	const ref = useRef<HTMLDivElement>(null)
	useOnPressEsc(onClose)
	useOnClickOutside({ callback: onClose, ref })

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div
				className="flex w-[527px] flex-col items-center gap-8 rounded-[24px] bg-white px-16 py-12"
				ref={ref}
			>
				<h2 className="text-center text-[24px] leading-[35px] font-bold tracking-[-0.04em]">
					{title}
				</h2>
				<div className="flex w-full flex-col gap-4">
					<button
						onClick={onKakaoShare}
						className="bg-yellow flex w-full items-center gap-20 rounded-[50px] px-8 py-4 outline-none"
					>
						<div className="h-[37px] w-[37px]">
							<Image src="/assets/icons/kakao.svg" alt="카카오" width={37} height={37} />
						</div>
						<span className="text-body-medium text-[16px] leading-6 font-medium tracking-[-0.02em]">
							카카오로 공유하기
						</span>
					</button>
					<button
						onClick={onLinkShare}
						className="bg-gray-10 flex w-full items-center gap-20 rounded-[50px] px-8 py-4 outline-none"
					>
						<div className="h-[37px] w-[37px] p-2">
							<Icon.Share size={23} className="h-full w-full text-black" />
						</div>
						<span className="text-body-medium text-[16px] leading-6 font-medium tracking-[-0.02em]">
							링크로 공유하기
						</span>
					</button>
				</div>
			</div>
			<button onClick={onClose} className="absolute top-8 right-8 text-white">
				<Icon.Close className="h-8 w-8" />
			</button>
		</div>
	)
}
