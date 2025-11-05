import { type LucideIcon } from "lucide-react";

export default function CourseLogoDetails({
  icon: Icon,
  description,
}: {
  icon: LucideIcon;
  description: string;
}) {
  return (
    <div className="flex items-center gap-0.5">
      <div className="bg-primary/10 rounded-sm p-1.5">
        <Icon className="text-primary size-5" />
      </div>
      <span className="text-muted-foreground ml-2 text-sm">{description}</span>
    </div>
  );
}
