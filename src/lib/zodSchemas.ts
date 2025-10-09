import { z } from "zod";
import { type CourseLevel, type CourseStatus } from "@/generated/prisma";

const courseLevels: CourseLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

const courseStatus: CourseStatus[] = [
  "Draft",
  "Published",
  "Archived",
] as const;

export const courseSchema = z.object({
  title: z
    .string({ error: "Title must be a string." })
    .min(1, { error: "Course title cannot be empty." })
    .max(250, { error: "Course title must be at most 250 characters." }),

  description: z
    .string({ error: "Description must be a string." })
    .min(1, { error: "Course description cannot be empty." })
    .max(1024, {
      error: "Course description must be at most 1024 characters.",
    }),

  fileKey: z
    .string({ error: "File key must be a string." })
    .min(1, { error: "Please upload a valid file." }),

  price: z.coerce
    .number({ error: "Price must be a number." })
    .min(1, { error: "Price must be at least 1." }),

  duration: z.coerce
    .number({ error: "Duration must be a number." })
    .min(1, { error: "Duration must be at least 1." }),

  level: z.enum(courseLevels, { error: "Please select a valid course level." }),

  status: z.enum(courseStatus, {
    error: "Please select a valid course status.",
  }),

  category: z
    .string({ error: "Category must be a string." })
    .min(1, { error: "Please select a course category." }),

  slug: z
    .string({ error: "Slug must be a string." })
    .min(1, { error: "Slug cannot be empty." }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
