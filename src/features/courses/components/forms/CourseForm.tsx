"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Plus, WandSparkles } from "lucide-react";
import slugify from "slugify";
import { toast } from "sonner";
import { useSpinDelay } from "spin-delay";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCourse } from "@/features/courses/actions/actions";
import CourseField from "@/features/courses/components/forms/CourseField";
import SelectCourseField, {
  type SelectItemType,
} from "@/features/courses/components/forms/SelectCourseField";
import Editor from "@/features/editor/components/Editor";
import Uploader from "@/features/imageUploader/components/Uploader";
import { courseSchema, type CourseSchemaType } from "@/lib/zodSchemas";

type SelectItemsFields = {
  [key: string]: SelectItemType[];
};

const selectItems: SelectItemsFields = {
  categories: [
    { name: "development", value: "Development" },
    { name: "business", value: "Business" },
    { name: "finance", value: "Finance" },
    { name: "it_software", value: "IT & Software" },
    { name: "office_productivity", value: "Office Productivity" },
    { name: "personal_development", value: "Personal Development" },
    { name: "design", value: "Design" },
    { name: "marketing", value: "Marketing" },
    { name: "health_fitness", value: "Health & Fitness" },
    { name: "music", value: "Music" },
    { name: "teaching_academics", value: "Teaching & Academics" },
  ],

  levels: [
    { name: "Beginner", value: "Beginner" },
    { name: "Intermediate", value: "Intermediate" },
    { name: "Advanced", value: "Advanced" },
  ],

  status: [
    { name: "Draft", value: "Draft" },
    { name: "Published", value: "Published" },
    { name: "archived", value: "Archived" },
  ],
};

const handleSlugify = function (text: string) {
  console.log(slugify(text));
  return slugify(text);
};

export default function CourseForm() {
  const router = useRouter();
  const [isTransitionPending, startTransition] = useTransition();
  const isPending = useSpinDelay(isTransitionPending, {
    delay: 300,
    minDuration: 350,
  });

  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      fileKey: "",
      category: "",
      level: "Beginner",
      status: "Draft",
      price: 0,
      duration: 0,
    },
  });

  const watchTitle = form.watch("title");

  return (
    <Form {...form}>
      <form
        className="space-y-7"
        onSubmit={form.handleSubmit((e) => {
          startTransition(async () => {
            const { error, message } = await createCourse(e);

            // prettier-ignore
            if(error)
              toast.error(message)
            else {
              toast.success(message)
              form.reset();
              router.push('/dashboard/courses')
            }
          });
        })}
      >
        <CourseField
          name="title"
          label="Title"
          placeholder="Course Title"
          Field={Input}
        />

        <CourseField
          name="slug"
          label="Slug"
          placeholder="Course Slug"
          Field={Input}
          className="w-full"
        >
          <Button
            className="xs:w-fit w-full py-5.5"
            type="button"
            disabled={watchTitle === "" || isPending}
            onClick={() =>
              form.setValue("slug", handleSlugify(form.getValues("title")), {
                shouldValidate: true,
              })
            }
          >
            <WandSparkles />
            <span>Generate Slug</span>
          </Button>
        </CourseField>

        <CourseField
          name="description"
          label="Description"
          placeholder="Course Description"
          Field={Editor}
          noPadding
          customValue
        />

        <CourseField
          name="fileKey"
          label="Thumbnail Image"
          placeholder="Thumbnail url"
          Field={Uploader}
        />

        <aside className="xs:grid-cols-2 grid grid-cols-1 items-start gap-8">
          <SelectCourseField
            name="category"
            label="Category"
            placeholder="Course Category"
            selectItems={selectItems.categories}
          />
          <SelectCourseField
            name="level"
            label="Level"
            placeholder="Course Level"
            selectItems={selectItems.levels}
          />
          <CourseField
            name="duration"
            label="Duration (hours)"
            placeholder="Duration"
            Field={Input}
          />
          <CourseField
            name="price"
            label="Price ($)"
            placeholder="Price"
            Field={Input}
          />
        </aside>
        <SelectCourseField
          name="status"
          label="Status"
          placeholder="Course Status"
          selectItems={selectItems.status}
        />
        <Button
          className="py-5.5"
          disabled={
            Object.values(form.formState.errors).length > 0 || isPending
          }
          type="submit"
        >
          {isPending ? (
            <>
              Creating
              <LoaderCircle className="animate-spin" />
            </>
          ) : (
            <>
              <span>Create Course</span>
              <Plus />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
