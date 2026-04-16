// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { httpClient } from "@/lib/axios/httpClient";

// export const ForgotPasswordAction = async (email: string) => {
//   try {
//     const response = await httpClient.post("/auth/forgot-password", {
//       email,
//     });

//     return response;
//   } catch (error: any) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Failed to send reset email",
//     };
//   }
// };
