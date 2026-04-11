/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { revalidatePath } from "next/cache";


export const createRouteAction = async ( formData: FormData) => {
  try {
    const res = await httpClient.post('/route/create-route', formData);
    revalidatePath('/admin/routes-management')
    return { 
      success: true, 
      data: res 
    };
  } catch (error: any) {
    console.error("Create route Action Error:", error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.message || error.message || "Failed to Create route" 
    };
  }
};

export const updateRouteAction = async (id: string, formData: FormData) => {
  try {
    const res = await httpClient.patch(`/route/${id}`, formData);
    // Ensure this path matches your actual project structure
    revalidatePath('/dashboard/admin/routes-management'); 
    return { 
      success: true, 
      data: res.data 
    };
  } catch (error: any) {
    console.error("Update route Action Error:", error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.message || error.message || "Failed to update route" 
    };
  }
};


export const deleteRoute = async (id: string) => {
  const res = await httpClient.delete(`/route/${id}`);
  return res.data;
};