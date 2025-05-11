import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const createReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string().refine((val) => isValidObjectId(val), {
      message: "Invalid courseId (must be a valid MongoDB ObjectId)",
    }),
    rating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5"),
    review: z.string().min(1, "Instructor is required"),
  }),
});

export const ReviewValidations = {
  createReviewValidationSchema,
};
