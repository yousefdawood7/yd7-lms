import Image from "next/image";
import Link from "next/link";
import { CodeXml, LayoutPanelLeft, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CourseLogoDetails from "@/features/courses/components/CourseLogoDetails";
import { GetCoursesType } from "@/features/courses/queries/queries";

export default function CourseItem({ course }: { course: GetCoursesType }) {
  return (
    <Card className="w-full min-w-[300px] flex-1 overflow-hidden rounded-md py-0">
      <Image
        src={course.fileKey}
        alt={course.title}
        width={350}
        height={200}
        className="w-full"
        unoptimized
      />
      <CardHeader>
        <CardTitle className="text-lg">{course.title}</CardTitle>
        <CardDescription className="truncate tracking-tight">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-wrap items-center gap-5.5">
        <CourseLogoDetails icon={Timer} description={`${course.duration}h`} />
        <CourseLogoDetails
          icon={LayoutPanelLeft}
          description={course.category}
        />
        <CourseLogoDetails icon={CodeXml} description={course.level} />
      </CardContent>
      <CardFooter className="mt-auto px-0">
        <Button className="w-full rounded-t-none py-5.5" asChild>
          <Link href={`/courses/${course.slug}/edit`}>Edit Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
