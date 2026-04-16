import CustomerDashboardContent from "@/components/modules/Dashboard/Customer/CustomerDashboardContent";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";



const AdminLayoutPage = async () => {
    const queryClient = new QueryClient();
  

  
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
        <CustomerDashboardContent/>
      </HydrationBoundary>
    )
}

export default AdminLayoutPage