

import PaymentTable from '@/components/modules/admin/paymentTable';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'
import { getAllPayments } from './_action';

const PaymentManagementPage = async () => {

const queryClient = new QueryClient();

      await queryClient.prefetchQuery({
        queryKey: ['getAllPayments'],
        queryFn: getAllPayments,
    })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PaymentTable/>
    </HydrationBoundary>
  )
}

export default PaymentManagementPage