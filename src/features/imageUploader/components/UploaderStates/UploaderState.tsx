import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export enum UPLOADER_STATE {
  NORMAL,
  ERROR,
}

type UploaderStateProps = {
  icon: LucideIcon;
  bgStyles?: string;
  iconStyles?: string;
  btnStyles?: string;
  state: UPLOADER_STATE;
  buttonText: string;
  content: React.ReactNode;
};

export default function UploaderState({
  state,
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
