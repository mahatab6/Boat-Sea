

"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IRoute } from "@/types/route.types";

export async function getRoute(): Promise<ApiResponse<IRoute[]>> {
  try {
    const response = await httpClient.get<IRoute[]>("/route");
    return response; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {


    return {
      success: false,
      message: error.message || "An error occurred.",
      data: [],
    };
  }
}