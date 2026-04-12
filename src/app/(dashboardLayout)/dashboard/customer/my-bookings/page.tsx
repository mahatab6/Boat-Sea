import MyBookingTable from '@/components/modules/customerDashboard/MyBookingTable'
import React from 'react'
import { getMyBooking } from './_action';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';


const CustomerPage = async () => {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getMyBooking"],
    queryFn: getMyBooking,
  });


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyBookingTable />
    </HydrationBoundary>
  )
}

export default CustomerPage