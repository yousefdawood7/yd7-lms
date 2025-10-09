"use client";

import { useForm } from "react-hook-form";
import { WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CourseField from "@/features/courses/components/forms/CourseField";
import SelectCourseField, {
  type SelectItemType,
} from "@/features/courses/components/forms/SelectCourseField";

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
    { name: "beginner", value: "Beginner" },
    { name: "intermediate", value: "Intermediate" },
    { name: "advanced", value: "Advanced" },
  ],

  status: [
    { name: "draft", value: "Draft" },
    { name: "published", value: "Published" },
    { name: "archived", value: "Archived" },
  ],
};

export default function CourseForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      fileKey: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-7">
        <CourseField
          name="title"
          label="Title"
          placeholder="Course Title"
          Field={Input}
        />
        <aside className="xs:flex-row xs:gap-x-5 flex flex-col items-end gap-y-5">
          <CourseField
            name="slug"
            label="Slug"
            placeholder="Course Slug"
            Field={Input}
            className="w-full"
          />
          <Button className="xs:w-fit w-full py-5.5" type="button">
            <WandSparkles />
            <span>Generate Slug</span>
          </Button>
        </aside>
        <CourseField
          name="description"
          label="Description"
          placeholder="Course Description"
          Field={Textarea}
          noPadding
        />
        <CourseField
          name="fileKey"
          label="Thumbnail Image"
          placeholder="Thumbnail url"
          Field={Input}
        />
        <aside className="xs:grid-cols-2 grid grid-cols-1 gap-8">
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
      </form>
    </Form>
  );
}
