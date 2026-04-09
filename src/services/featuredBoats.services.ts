/* eslint-disable @typescript-eslint/no-explicit-any */


"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IBoat } from "@/types/boat.types";

export async function featuredBoats(): Promise<ApiResponse<IBoat[]>> {
  try {
    const response = await httpClient.get<IBoat[]>("/boats/featuredBoats");

    return response; 
  } catch (error: any) {
 

    return {
      success: false,
      message: error.message || "An error occurred.",
      data: [],
    };
  }
}