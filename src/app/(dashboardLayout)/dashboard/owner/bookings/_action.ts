/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { BookingRequest } from "@/types/booking.types";


export const getBookinRequest = async (
  params: Record<string, any> = {},
): Promise<ApiResponse<BookingRequest[]>> => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `/booking/my-booking-requests${queryString ? `?${queryString}` : ""}`;

    const response = await httpClient.get<BookingRequest[]>(url);

    return response;
  } catch (error) {
    throw error;
  }
};


export async function getViewRouteById(id: string) {
  try {
    const response = await httpClient.get(`/schedule/view-route/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching view route data.",
      data: null,
    };
  }
}