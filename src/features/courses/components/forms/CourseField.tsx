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
import { type EditorProps } from "@/features/editor/components/Editor";

type FieldProps = {
  className: string;
  placeholder: string;
} & ControllerRenderProps<FieldValues, string>;

type CourseFieldProps = {
  name: string;
  label?: string;
  Field: React.FC<FieldProps> | React.FC<EditorProps>;
  children?: React.ReactNode;
  type?: string;
  placeholder?: string;
  className?: string;
  noPadding?: boolean;
  customValue?: boolean;
};

export default function CourseField({
  name,
  label,
  placeholder,
  className,
  Field,
  noPadding,
  children,
  customValue,
}: CourseFieldProps) {
  const form = useFormContext();
  const compClassName = className || "";

  const classNameValue = cn(
    "w-full",
    children
      ? `flex flex-col xs:flex-row items-end gap-y-2 ${compClassName}`.trim()
      : compClassName,
  );

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <div className="flex w-full flex-col gap-2">
          <FormItem className={classNameValue}>
            <aside className="flex w-full flex-col gap-2 overflow-auto">
              {label && <FormLabel className="text-lg">{label}</FormLabel>}
              <FormControl>
                <Field
                  {...field}
                  className={cn(!noPadding ? "py-5.5" : "")}
                  placeholder={placeholder || ""}
                  {...(customValue && {
                    handleChange: (value) =>
                      form.setValue(name, value, { shouldValidate: true }),
                  })}
                />
              </FormControl>
            </aside>
            <FormMessage className="xs:hidden mr-auto" />
            {children}
          </FormItem>
          <FormMessage className="xs:block hidden" />
        </div>
      )}
    />
  );
}
