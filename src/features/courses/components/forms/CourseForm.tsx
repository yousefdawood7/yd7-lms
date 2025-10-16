"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CourseField from "@/features/courses/components/forms/CourseField";
import SelectCourseField, {
  type SelectItemType,
} from "@/features/courses/components/forms/SelectCourseField";
import Editor from "@/features/editor/components/Editor";
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

export default function CourseForm() {
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

  return (
    <Form {...form}>
      <form
        className="space-y-7"
        onSubmit={form.handleSubmit((e) => {
          console.log(e);
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
          <Button className="xs:w-fit w-full py-5.5" type="button">
            <WandSparkles />
            <span>Generate Slug</span>
          </Button>
        </CourseField>

        {/* <CourseField
          name="description"
          label="Description"
          placeholder="Course Description"
          Field={Textarea}
          noPadding
        /> */}

        <Editor />

        <CourseField
          name="fileKey"
          label="Thumbnail Image"
          placeholder="Thumbnail url"
          Field={Input}
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
        <Button className="py-5.5">
          <span>Create Course</span>
          <Plus />
        </Button>
      </form>
    </Form>
  );
}
