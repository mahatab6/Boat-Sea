/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { BookingRequest } from "@/types/booking.types";


export const getAllBooking = async (
  params: Record<string, any> = {},
): Promise<ApiResponse<BookingRequest[]>> => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `/booking${queryString ? `?${queryString}` : ""}`;

    const response = await httpClient.get<BookingRequest[]>(url);

    return response;
  } catch (error) {
    throw error;
  }
};