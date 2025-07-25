import React from 'react'

export type TabType = 'food' | 'history' | 'bookmark'

interface TabButtonsProps {
	activeTab: TabType
	onTabChange: (tab: TabType) => void
}

export const TabButtons: React.FC<TabButtonsProps> = ({ activeTab, onTabChange }) => {
	return (
		<div className="flex gap-2">
			<button
				onClick={() => onTabChange('food')}
				className={`text-b2-bold rounded-3xl px-4 py-2 font-bold ${
					activeTab === 'food' ? 'bg-gray-5 text-black' : 'text-gray-30'
				}`}
			>
				음식 설정
			</button>
			<button
				onClick={() => onTabChange('history')}
				className={`text-b2-bold rounded-3xl px-4 py-2 font-bold ${
					activeTab === 'history' ? 'bg-gray-5 text-black' : 'text-gray-30'
				}`}
			>
				추천 결과 히스토리
			</button>
			<button
				onClick={() => onTabChange('bookmark')}
				className={`text-b2-bold rounded-3xl px-4 py-2 font-bold ${
					activeTab === 'bookmark' ? 'bg-gray-5 text-black' : 'text-gray-30'
				}`}
			>
				북마크
			</button>
		</div>
	)
}
