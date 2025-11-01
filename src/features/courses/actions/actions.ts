"use server";

import { request } from "@arcjet/next";
import { isValidRole } from "@/features/auth/data/access/role";
import { prisma } from "@/lib/prisma";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { aj } from "@/utils/arcjet-rules";

export async function createCourse(courseDetails: CourseSchemaType) {
  const adminSession = await isValidRole(["admin"]);
  const req = await request();
  const decision = await aj.protect(req, { userId: adminSession.user.id });
  console.log("ADMIN ===> ", adminSession.user.id);

  if (decision.isDenied()) {
    if (decision.reason.isBot())
      return { error: true, message: "Bots are not allowed to upload files." };

    if (decision.reason.isRateLimit())
      return {
        error: true,
        message: "Too many requests. Please try again later.",
      };
  }

  const courseData = courseSchema.safeParse(courseDetails);

  // prettier-ignore
  if (courseData.error) 
    return {error: true, message: "Invalid course data" };

  try {
    await prisma.course.create({
      data: { ...courseData.data, userId: adminSession.user.id },
    });

    return { error: false, message: "Course created successfully." };
  } catch {
    return {
      error: true,
      message: "Failed to create course. Please try again later.",
    };
  }
}
