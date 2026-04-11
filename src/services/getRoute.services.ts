/* eslint-disable @typescript-eslint/no-explicit-any */


"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IRoute } from "@/types/route.types";

export const getRoute = async (params: Record<string, any> = {}): Promise<ApiResponse<IRoute[]>> => {
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = `/route${queryString ? `?${queryString}` : ""}`;
        
        // If your httpClient is a standard Axios instance:
        const response = await httpClient.get<IRoute[]>(url);
        return response; 
    } catch (error) {
        
        throw error;
    }
}
