import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <section className="flex flex-col gap-y-10">
      <article className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Your Courses</h2>
        <Button asChild className="py-6 text-lg tracking-tight">
          <Link href="/dashboard/courses/create">Create Course</Link>
        </Button>
      </article>
      <article>
        <p>Here you will see all of the courses</p>
      </article>
    </section>
  );
}
