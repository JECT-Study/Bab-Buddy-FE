'use client'

import React, { useState } from 'react'
import { ProfileSection } from './ProfileSection'
import { TabButtons } from './TabButtons'
import { FoodSettingsTab } from './FoodSettingsTab'
import { RecommendationHistoryTab } from './RecommendationHistoryTab'
import { BookmarkTab } from './BookmarkTab'
import type { TabType } from './TabButtons'

export const MyInfo: React.FC = () => {
	const [activeTab, setActiveTab] = useState<TabType>('food')

	return (
		<main className="mb-[100px] flex flex-col">
			{/* Main Content */}
			<div className="flex flex-1 justify-center pt-12">
				<div className="flex w-[864px] flex-col gap-12">
					{/* Page Title */}
					<div className="text-center">
						<h1 className="text-h2-bold">마이페이지</h1>
					</div>

					<ProfileSection />

					<TabButtons activeTab={activeTab} onTabChange={setActiveTab} />

					{/* Tab Content */}
					{activeTab === 'food' && <FoodSettingsTab />}
					{activeTab === 'history' && <RecommendationHistoryTab />}
					{activeTab === 'bookmark' && <BookmarkTab />}
				</div>
			</div>
		</main>
	)
}
