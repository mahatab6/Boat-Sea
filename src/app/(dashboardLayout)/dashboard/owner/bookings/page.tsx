import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import BookingRequestTable from "@/components/modules/boat-owner/BookingRequestTable";

const BookingRequestsPage = async () => {
  const queryClient = new QueryClient();


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BookingRequestTable />
    </HydrationBoundary>
  );
};

export default BookingRequestsPage;
