'use client'

import { useEffect, useState } from 'react'
import { useDislikedFoodStore } from '../store/dislikedFoodStore'
import { addDislikedFood, deleteDislikedFood, getDislikedFoods } from '../api/dislikedFood'

export const useDislikedFoods = () => {
	const { foods, setFoods, removeFoodFromState } = useDislikedFoodStore()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)

	const fetchFoods = async () => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await getDislikedFoods()
			setFoods(response)
		} catch (error) {
			setError(error as Error)
			console.error('Failed to fetch disliked foods:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleAddFood = async (foodName: string) => {
		setIsLoading(true)
		setError(null)
		try {
			await addDislikedFood(foodName)
			// API 호출 후 전체 목록을 다시 가져와서 최신 상태 유지
			const response = await getDislikedFoods()
			setFoods(response)
		} catch (error) {
			setError(error as Error)
			console.error('Failed to add disliked food:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleRemoveFood = async (foodId: string) => {
		setIsLoading(true)
		setError(null)
		try {
			await deleteDislikedFood(foodId)
			removeFoodFromState(foodId)
		} catch (error) {
			setError(error as Error)
			console.error('Failed to remove disliked food:', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchFoods()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		foods,
		isLoading,
		error,
		handleAddFood,
		handleRemoveFood,
	}
}
