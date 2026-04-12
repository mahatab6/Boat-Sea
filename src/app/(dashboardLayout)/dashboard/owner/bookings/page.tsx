import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { getBookinRequest } from "./_action";
import BookingRequestTable from "@/components/modules/boat-owner/BookingRequestTable";

const BookingRequestsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getBookinRequest"],
    queryFn: getBookinRequest,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BookingRequestTable />
    </HydrationBoundary>
  );
};

export default BookingRequestsPage;
