import { z } from "zod";

export const userValidationSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
    role: z.enum(["user", "admin"]).default("user"),
  }),
});

export const makeAdminValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Please enter a valid email address"),
  }),
});

export const userValidations = {
  userValidationSchema,
  makeAdminValidationSchema,
};
