import {
  type ControllerRenderProps,
  type FieldValues,
  useFormContext,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

type FieldProps = {
  className: string;
  placeholder: string;
} & ControllerRenderProps<FieldValues, string>;

type CourseFieldProps = {
  name: string;
  label: string;
  Field: React.FC<FieldProps>;
  type?: string;
  placeholder?: string;
  className?: string;
  noPadding?: boolean;
};

export default function CourseField({
  name,
  label,
  placeholder,
  className,
  Field,
  noPadding,
}: CourseFieldProps) {
  const form = useFormContext();

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className={className || ""}>
          <FormLabel className="text-lg">{label}</FormLabel>
          <FormControl>
            <Field
              className={cn(!noPadding ? "py-5.5" : "")}
              placeholder={placeholder || ""}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
