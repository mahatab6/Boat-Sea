"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { DashboardData } from "@/types/dashboard.types";



export async function getDashboardData() {
    try {
        const response = await httpClient.get<DashboardData>("/stats");
        return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      
        return{
        success: false,
        message: error.message || "An error occurred while fetching dashboard data.",
        data: null,
        meta: null,
        }
    }
}