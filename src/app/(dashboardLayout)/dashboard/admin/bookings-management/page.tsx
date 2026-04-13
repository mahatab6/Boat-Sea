

import BookingTable from '@/components/modules/admin/bookingTable'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'
import { getAllBooking } from './_action';

const page = async () => {

  const queryClient = new QueryClient();

      await queryClient.prefetchQuery({
        queryKey: ['getAllBooking'],
        queryFn: getAllBooking,
    })


  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
          <BookingTable/>
        </HydrationBoundary>
  )
}

export default page