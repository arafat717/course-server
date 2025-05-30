import { z } from "zod";

export const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z.string({ required_error: "Password is required" }),
  }),
});

export const LoginserValidations = {
  loginUserValidationSchema,
  changePasswordValidationSchema,
};
