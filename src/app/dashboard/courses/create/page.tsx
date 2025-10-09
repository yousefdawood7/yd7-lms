import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateCourseForm from "@/features/courses/components/CreateCourseForm";

export default function Page() {
  return (
    <section className="flex flex-col gap-y-5">
      <article className="flex items-center gap-x-3.5">
        <Button size={"icon-lg"} variant={"outline"} asChild>
          <Link href={"/dashboard/courses"}>
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <p className="text-2xl font-semibold tracking-tight">Create Course</p>
      </article>
      <CreateCourseForm />
    </section>
  );
}
