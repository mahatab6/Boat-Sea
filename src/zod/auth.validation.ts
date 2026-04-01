import { z } from "zod";

export const loginZodSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string()
        .min(1, "Password is required")
        .min(2, "Password must be at least 8 chareacters log")
})


export const registerZodSchema = z.object({
    name : z.string("User name is required"),
    email : z.string("Enter your email"),
    password : z.string().min(1, "Password is required").min(8, "Password must be at least 8 chareacters log"),
    role : z.string().optional()
})

export const verifyemailZodSchema = z.object({
    email : z.string("Enter your email"),
    otp: z.string("Enter 6-digit code")
})




export type IRegisterPayload = z.infer<typeof registerZodSchema>

export type ILoginPayload = z.infer<typeof loginZodSchema>

export type IverifyemailPayload = z.infer<typeof verifyemailZodSchema>


