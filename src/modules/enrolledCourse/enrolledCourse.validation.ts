import { z } from "zod";

const createEnrolledCourseValidationZodSchema = z.object({
  body: z.object({
    course: z.string(),
  }),
});

export const enrolledCourseValidation = {
  createEnrolledCourseValidationZodSchema,
};
