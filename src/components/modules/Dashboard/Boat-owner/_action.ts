/* eslint-disable @typescript-eslint/no-explicit-any */


"use server"

import { httpClient } from '@/lib/axios/httpClient';
import { revalidatePath } from 'next/cache';

export const createBoatAction = async (formData: FormData) => {
  try {
    
    const res = await httpClient.post('/boats/create-boat', formData);

    revalidatePath('/dashboard/boats'); 

    return { success: true, data: res.data };
  } catch (error: any) {
    console.error("Server Action Error:", error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.message || "Failed to create boat" 
    };
  }
};

export const updateBoatAction = async (id: string, formData: FormData) => {
  try {

    const res = await httpClient.put(`/boats/${id}`, formData);

    revalidatePath('/dashboard/owner/boats');
    revalidatePath(`/dashboard/owner/boats/${id}`);

    return { 
      success: true, 
      data: res 
    };
  } catch (error: any) {
    console.error("Update Boat Action Error:", error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.message || error.message || "Failed to update boat" 
    };
  }
};



export const createScheduleAction = async (data: any) => {
  try {
    const res = await httpClient.post("/schedule", data);
    revalidatePath("/dashboard/boats"); 
    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    console.error("Schedule Creation Error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create schedule",
    };
  }
};