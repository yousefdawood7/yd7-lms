"use server";

import { isValidAccess } from "@/features/auth/data/access/data-access";
import { prisma } from "@/lib/prisma";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";

export async function createCourse(courseDetails: CourseSchemaType) {
  const validateObject = await isValidAccess("create");

  // prettier-ignore
  if (validateObject.error)
    return { error: true, message: validateObject.message };

  const courseData = courseSchema.safeParse(courseDetails);

  // prettier-ignore
  if (courseData.error) 
    return {error: true, message: "Invalid course data" };

  try {
    await prisma.course.create({
      data: { ...courseData.data, userId: validateObject.sessionID },
    });

    return { error: false, message: "Course created successfully." };
  } catch {
    return {
      error: true,
      message: "Failed to create course. Please try again later.",
    };
  }
}
