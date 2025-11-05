import { isValidAccess } from "@/features/auth/data/access/data-access";
import { prisma } from "@/lib/prisma";

export default async function getCourses() {
  const validateObject = await isValidAccess("read");
  if (validateObject.error)
    return { error: true as const, message: validateObject.message };

  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      where: { userId: validateObject.sessionID },
      omit: { createdAt: true, updatedAt: true, userId: true },
    });

    return { error: false as const, courses };
  } catch (error) {
    console.log(error);
    return {
      error: true as const,
      message: "Failed to list all of your courses. Please try again later.",
    };
  }
}

export type GetCoursesType = Exclude<
  Awaited<ReturnType<typeof getCourses>>["courses"],
  undefined
>[0];
