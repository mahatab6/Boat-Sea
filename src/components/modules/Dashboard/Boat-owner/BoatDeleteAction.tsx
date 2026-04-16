"use server"

// BoatDeleteAction.ts
import { httpClient } from '@/lib/axios/httpClient';

export const deleteBoatAction = async (boatId: string) => {
   
  try {
    await httpClient.delete(`/boats/${boatId}`);
    return { success: true };
  } catch (error) {
    
    throw error; 
  }
};