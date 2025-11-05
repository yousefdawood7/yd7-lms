import Link from "next/link";
import { Button } from "@/components/ui/button";
import CoursesList from "@/features/courses/components/CoursesList";

export default function Page() {
  return (
    <section className="flex flex-col gap-y-10">
      <article className="flex flex-col items-start gap-2.5 sm:flex-row sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Your Courses</h2>
        <Button asChild className="py-6 text-lg tracking-tight">
          <Link href="/dashboard/courses/create">Create Course</Link>
        </Button>
      </article>
      <article className="flex flex-wrap gap-7.5 px-2.5">
        <CoursesList />
      </article>
    </section>
  );
}
