"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { ISchedule } from "@/types/schedule.type";

export const getAllSchedule = async (
  params: Record<string, any> = {},
): Promise<ApiResponse<ISchedule[]>> => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `/schedule/my-boat-schedule${queryString ? `?${queryString}` : ""}`;

    const response = await httpClient.get<ISchedule[]>(url);

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteSchedule = async (id: string) => {
  const res = await httpClient.delete(`/schedule/${id}`);

  return res.data;
};

export const updateScheduleAction = async (id: string, data: any) => {
  try {
    console.log(data, id)
    const res = await httpClient.patch(`/schedule/${id}`, data);
    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update schedule",
    };
  }
};
