import Image from "next/image";
import Link from "next/link";
import {
  CodeXml,
  EllipsisVertical,
  Eye,
  LayoutPanelLeft,
  Pencil,
  Timer,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CourseLogoDetails from "@/features/courses/components/CourseLogoDetails";
import { GetCoursesType } from "@/features/courses/queries/queries";

export default function CourseItem({ course }: { course: GetCoursesType }) {
  return (
    <Card className="relative w-full min-w-[300px] flex-1 overflow-hidden rounded-md py-0">
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-popover absolute top-3 right-3 rounded-sm p-1.5">
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/courses/${course.slug}/edit`}>
                <Pencil />
                Edit Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/courses/${course.slug}`}>
                <Eye />
                View Course
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/courses/${course.slug}/delete`}>
                <Trash2 className="text-destructive" />
                Delete Course
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

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
