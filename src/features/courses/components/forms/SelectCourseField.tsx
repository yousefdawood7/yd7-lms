import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SelectItemType = {
  name: string;
  value: string;
};

type CourseFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  selectItems: SelectItemType[];
};

export default function SelectCourseField({
  name,
  label,
  placeholder,
  className,
  selectItems,
}: CourseFieldProps) {
  const form = useFormContext();

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className={className || ""}>
          <FormLabel className="text-lg">{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full py-5.5">
                <SelectValue placeholder={placeholder || ""} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {selectItems.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
