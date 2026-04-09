/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IBoat } from "@/types/boat.types";


export async function getAllBoats(params: Record<string, any> = {}): Promise<ApiResponse<IBoat[]>> {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `/boats${queryString ? `?${queryString}` : ""}`;
    
    const response = await httpClient.get<IBoat[]>(url);
    return response;
  } catch (error: any) {


    return {
      success: false,
      message: error.message || "An error occurred.",
      data: [],
      meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  }
}