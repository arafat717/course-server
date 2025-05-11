import { z } from "zod";

export const tagSchema = z.object({
  name: z.string().min(1, "Tag name is required"),
  isDeleted: z.boolean().default(false),
});

export const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string().min(1, "Instructor is required"),
    price: z.number().nonnegative("Price must be a non-negative number"),
    tags: z.array(tagSchema).optional(),
    startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid start date format",
    }),
    endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid end date format",
    }),
    language: z.string().min(1, "Language is required"),
    provider: z.string().min(1, "Provider is required"),
    details: z.object({
      level: z.enum(["Beginner", "Intermediate", "Advanced"]),
      description: z.string().min(1, "Description is required"),
    }),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
};
