/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { revalidatePath } from "next/cache";


export const updateProfileAction = async ( formData: FormData) => {
  try {
    const res = await httpClient.put('/users/profile', formData);
    revalidatePath('/profile')
    return { 
      success: true, 
      data: res 
    };
  } catch (error: any) {
    console.error("Update Profile Action Error:", error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.message || error.message || "Failed to update profile" 
    };
  }
};