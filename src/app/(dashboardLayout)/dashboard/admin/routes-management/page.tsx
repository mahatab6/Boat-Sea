import RouteTable from "@/components/modules/admin/routeTable";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const RoutesManagementPage = async () => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RouteTable />
    </HydrationBoundary>
  );
};

export default RoutesManagementPage;
