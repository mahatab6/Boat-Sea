/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IReview } from "@/types/booking.types";

export async function getBoatById(id: string) {
  try {
    const response = await httpClient.get(`/boats/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching boat data.",
      data: null,
    };
  }
}

export async function getRouteById(id: string) {
  try {
    const response = await httpClient.get(`/schedule/available-route/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching schedule data.",
      data: null,
    };
  }
}

export async function getReviewById(id: string): Promise<ApiResponse<IReview[]>> {
  try {
    const response = await httpClient.get<IReview[]>(`/reviews/${id}`);
    return response;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}


export async function getMYReview(): Promise<ApiResponse<IReview[]>> {
  try {
    const response = await httpClient.get<IReview[]>(`/reviews/my-review`);
    return response;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}


export async function bookingAndPayment(payload: any) {
  try {
    const response = await httpClient.post("/booking", payload); 
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "An error occurred",
      data: null,
    };
  }
}