/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";

export async function getBoatById(id: string) {
  try {
    const response = await httpClient.get(`/boats/${id}`);
    return response.data;
  } catch (error: any) {
    console.log(error, "From Boat Details Server action");

    return {
      success: false,
      message:
        error.message || "An error occurred while fetching boat data.",
      data: null,
    };
  }
}