"use server"

import { httpClient } from "@/lib/axios/httpClient";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/types/api.types";
import { PaymentRecord } from "@/types/payment.types";



export const getAllPayments = async (
  params: Record<string, any> = {},
): Promise<ApiResponse<PaymentRecord[]>> => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `/payments${queryString ? `?${queryString}` : ""}`;

    const response = await httpClient.get<PaymentRecord[]>(url);

    return response;
  } catch (error) {
    throw error;
  }
};