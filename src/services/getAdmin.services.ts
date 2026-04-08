"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { UserDetails } from "@/types/user.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllAdmin = async (params: Record<string, any> = {}): Promise<ApiResponse<UserDetails[]>> => {
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = `/users/getalluser${queryString ? `?${queryString}` : ""}`;
        
        // If your httpClient is a standard Axios instance:
        const response = await httpClient.get<UserDetails[]>(url);
        
        return response; 
    } catch (error) {
        console.error("Error fetching admins:", error);
        throw error;
    }
}