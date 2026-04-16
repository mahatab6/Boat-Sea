


import AdminTable from '@/components/modules/admin/adminTable';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'

const AdminsManagementPage = async () => {

    const queryClient = new QueryClient();


  return (
     <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminTable/>
    </HydrationBoundary>
  )
}

export default AdminsManagementPage