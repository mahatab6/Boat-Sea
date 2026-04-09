"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { cookies } from "next/headers";
const logoutAction = async () => {
try {
    await httpClient.post("/auth/logout", {})
  } catch (error) {

  } finally {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("better-auth.session_token");

    return { success: true }; 
  }
}

export default logoutAction