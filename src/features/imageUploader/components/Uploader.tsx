import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

export default function Uploader() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone();

  return (
    <article
      {...getRootProps({
        className: cn(
          "hover:border-primary min-h-[250px] rounded-md border-2 border-dashed transition-colors",
          isDragActive && "border-solid border-primary bg-primary/30",
        ),
      })}
    >
      <input {...getInputProps()} />
    </article>
  );
}
