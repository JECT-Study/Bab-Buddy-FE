import { useEffect } from 'react'
import { useAllergyStore } from '../store/allergyStore'
import { getAllergies, updateAllergies } from '../api/allergyApi'

export const useAllergy = () => {
	const { allergyTypes, setAllergyTypes } = useAllergyStore()
	const fetchAllergies = async () => {
		const response = await getAllergies()
		setAllergyTypes(response.map((allergy) => allergy.allergyType))
	}

	const handleAllergyToggle = async (allergyTypes: string[]) => {
		await updateAllergies(allergyTypes)
		setAllergyTypes(allergyTypes)
	}

	const handleAllergyRemove = async () => {
		await updateAllergies([])
		setAllergyTypes([])
	}

	useEffect(() => {
		fetchAllergies()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		allergyTypes,
		handleAllergyToggle,
		handleAllergyRemove,
	}
}
