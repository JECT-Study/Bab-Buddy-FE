import { useState } from 'react'
import { postBookMark } from '../api/bookMarkApi'
import Icon from '@/shared/components/Icon'

interface BookMarkProps {
	restaurantId: number
	isBookmarked?: boolean
}

export const BookMark: React.FC<BookMarkProps> = ({ restaurantId, isBookmarked = false }) => {
	const [isBookmarkedState, setIsBookmarkedState] = useState<boolean>(isBookmarked)

	const onBookmarkClick = () => {
		postBookMark(restaurantId).then(() => {
			setIsBookmarkedState(!isBookmarkedState)
		})
	}

	return (
		<button onClick={onBookmarkClick}>
			<Icon.Bookmark
				className={`h-[45px] w-[45px] ${isBookmarkedState ? 'text-[#FDDC3F]' : 'text-[#AEAEAE]'}`}
			/>
		</button>
	)
}
