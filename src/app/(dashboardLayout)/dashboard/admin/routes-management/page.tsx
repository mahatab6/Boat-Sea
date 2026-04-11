import RouteTable from "@/components/modules/admin/routeTable";
import { getRoute } from "@/services/getRoute.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const RoutesManagementPage = async () => {
  const queryClient = new QueryClient();

 await queryClient.prefetchQuery({
  queryKey: ["getAllRoute", "", "ALL", 1, 10],
  queryFn: () =>
    getRoute({
      searchTerm: "",
      difficulty: undefined,
      page: 1,
      limit: 10,
    }),
});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RouteTable />
    </HydrationBoundary>
  );
};

export default RoutesManagementPage;
