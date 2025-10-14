import { useState } from 'react'

interface UsePaginationProps<T> {
	items: T[]
	itemCountPerPage: number
}

export const usePagination = <T>({ items, itemCountPerPage }: UsePaginationProps<T>) => {
	const [page, setPage] = useState(1)

	const handlePageChange = (page: number) => {
		setPage(page)
	}
	const totalPages = Math.ceil(items.length / itemCountPerPage)
	const paginatedItems = items.slice((page - 1) * itemCountPerPage, page * itemCountPerPage)

	return { totalPages, page, paginatedItems, handlePageChange }
}
