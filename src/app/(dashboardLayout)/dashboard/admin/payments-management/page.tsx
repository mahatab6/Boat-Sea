

import PaymentTable from '@/components/modules/admin/paymentTable';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'


const PaymentManagementPage = async () => {

const queryClient = new QueryClient();

  

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PaymentTable/>
    </HydrationBoundary>
  )
}

export default PaymentManagementPage