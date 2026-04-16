import AdminDashboardContent from "@/components/modules/Dashboard/Admin/AdminDashboardContent";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";



const AdminLayoutPage = async () => {
    const queryClient = new QueryClient();
  
  
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
        <AdminDashboardContent/>
      </HydrationBoundary>
    )
}

export default AdminLayoutPage