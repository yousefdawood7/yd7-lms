import { notFound } from "next/navigation";
import CourseItem from "@/features/courses/components/CourseItem";
import getCourses from "@/features/courses/queries/queries";

export default async function CoursesList() {
  const courses = await getCourses();

  // prettier-ignore
  if (courses.error)
    throw new Error(courses.message);

  // prettier-ignore
  if (!courses.courses.length)
    notFound();

  return courses.courses.map((course) => (
    <CourseItem key={course.id} course={course} />
  ));
}
