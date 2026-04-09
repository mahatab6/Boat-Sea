"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { UserDetails } from "@/types/user.types";



export const getAllUsers = async () => {
    try {
    const response = await httpClient.get<ApiResponse<UserDetails[]>>('/users/getalluser');
    return response.data
    } catch (error) {
        throw error;

    }
}