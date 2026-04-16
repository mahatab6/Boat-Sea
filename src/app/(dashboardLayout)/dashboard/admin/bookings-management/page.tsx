

import BookingTable from '@/components/modules/admin/bookingTable'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

const page = async () => {

  const queryClient = new QueryClient();

     


  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
          <BookingTable/>
        </HydrationBoundary>
  )
}

export default page