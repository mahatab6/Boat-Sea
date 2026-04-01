import BoatOwnerDashboardContent from "@/components/modules/Dashboard/Boat-owner/BoatOwnerDashboardContent";
import { getDashboardData } from "@/services/dashboard.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const BoatOwnerPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["boatowner-dashboard-data"],
    queryFn: getDashboardData,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BoatOwnerDashboardContent />
    </HydrationBoundary>
  );
};

export default BoatOwnerPage;
