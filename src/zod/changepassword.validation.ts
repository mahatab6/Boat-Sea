import z from "zod"

export const changepasswordZodSchema = z.object({
    newPassword : z.string("Enter your New Password"),
    currentPassword: z.string("Enter Old Password")
})

export type IchangepasswordPayload = z.infer<typeof changepasswordZodSchema>