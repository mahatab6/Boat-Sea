/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IReviewPayload } from "@/components/modules/customerDashboard/ReviewModal";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IReview } from "@/types/booking.types";
import { TMyBooking } from "@/types/myBookingTable.type";

export const getMyBooking = async (): Promise<ApiResponse<TMyBooking[]>> => {
  try {
    const url = "/booking/my-bookings";

    const response = await httpClient.get<TMyBooking[]>(url);

    return response;
  } catch (error) {
    throw error;
  }
};

export const ReviewAction = async (
  payload: IReviewPayload,
): Promise<ApiResponse<IReview>> => {
  try {
    console.log(payload)
    const url = "/reviews";
    const response = await httpClient.post<ApiResponse<IReview>>(url, payload);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getAllReview = async (): Promise<ApiResponse<IReview[]>> => {
  try {
    const url = "/reviews";
    const response = await httpClient.get<IReview[]>(url);
    return response
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
