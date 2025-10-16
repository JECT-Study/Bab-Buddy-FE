import { getGroups } from '@/features/group/api/groupListApi'
import GroupContainer from '@/features/group/components/GroupContainer'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

export default async function GroupPage() {
	const queryClient = new QueryClient()
	queryClient.prefetchQuery({
		queryKey: ['groups'],
		queryFn: getGroups,
	})

	const dehydratedState = dehydrate(queryClient)

	return (
		<>
			<div className="flex w-[75%] flex-col items-center gap-6 rounded-3xl bg-white p-6">
				<div className="flex flex-col items-center gap-6 py-6">
					<h2 className="text-h2-bold">모두와 함께 음식 정하기</h2>
					<article className="flex w-[640px] flex-1 flex-col">
						<strong className="text-b1-bold">최근 생성된 그룹방</strong>
						<HydrationBoundary state={dehydratedState}>
							<GroupContainer />
						</HydrationBoundary>
					</article>
				</div>
			</div>
		</>
	)
}
