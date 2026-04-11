
import ScheduleTable from '@/components/modules/boat-owner/scheduleTable';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'

const schedulesPage = async () => {

   const queryClient = new QueryClient();

    //   await queryClient.prefetchQuery({
    //     queryKey: ['getAllAdmin'],
    //     queryFn: getAllAdmin,
    // })

  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
      <ScheduleTable/>
    </HydrationBoundary>
  )
}

export default schedulesPage