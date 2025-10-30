import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UploaderStateProps = {
  icon: LucideIcon;
  bgStyles?: string;
  iconStyles?: string;
  btnStyles?: string;
  buttonText: string;
  content: React.ReactNode;
};

export default function UploaderState({
  icon: Icon,
  iconStyles,
  bgStyles,
  btnStyles,
  buttonText,
  content,
}: UploaderStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5">
      <div
        className={cn(
          "flex size-15 items-center justify-center rounded-full",
          bgStyles,
        )}
      >
        <Icon className={cn("size-10", iconStyles)} />
      </div>
      {content}
      <Button type="button" className={cn("py-5.5", btnStyles)}>
        {buttonText}
      </Button>
    </div>
  );
}
