import { useState } from 'react'
import { postBookMark } from '../api/bookMarkApi'
import Icon from '@/shared/components/Icon'

interface BookMarkProps {
	restaurantId: number
}

export const BookMark: React.FC<BookMarkProps> = ({ restaurantId }) => {
	const [isBookmarked, setIsBookmarked] = useState<boolean>(false)

	const onBookmarkClick = () => {
		postBookMark(restaurantId).then(() => {
			setIsBookmarked(!isBookmarked)
		})
	}

	return (
		<button onClick={onBookmarkClick}>
			<Icon.Bookmark
				className={`h-[45px] w-[45px] ${isBookmarked ? 'text-[#FDDC3F]' : 'text-[#AEAEAE]'}`}
			/>
		</button>
	)
}
