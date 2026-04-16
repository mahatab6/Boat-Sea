
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'
import ScheduleTable from '@/components/modules/boat-owner/scheduleTable';

const schedulesPage = async () => {

   const queryClient = new QueryClient();

   
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScheduleTable/>
    </HydrationBoundary>
  )
}

export default schedulesPage