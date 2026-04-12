
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'
import { getAllSchedule } from './_action';
import ScheduleTable from '@/components/modules/boat-owner/scheduleTable';

const schedulesPage = async () => {

   const queryClient = new QueryClient();

      await queryClient.prefetchQuery({
        queryKey: ['getAllSchedule'],
        queryFn: getAllSchedule,
    })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScheduleTable/>
    </HydrationBoundary>
  )
}

export default schedulesPage