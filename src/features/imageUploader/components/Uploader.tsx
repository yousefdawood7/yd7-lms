import { useDropzone } from "react-dropzone";
import { Image } from "lucide-react";
import UploaderState, {
  UPLOADER_STATE,
} from "@/features/imageUploader/components/UploaderStates/UploaderState";
import { cn } from "@/lib/utils";

export default function Uploader() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone();

  return (
    <article
      {...getRootProps({
        className: cn(
          "flex flex-col hover:border-primary min-h-[250px] rounded-md border-2 border-dashed transition-colors",
          isDragActive && "border-solid border-primary bg-primary/30",
        ),
      })}
    >
      <input {...getInputProps()} />
      {/* <UploaderState
        state={UPLOADER_STATE.NORMAL}
        icon={CloudUpload}
        bgStyles="bg-secondary/50 dark:bg-muted-foreground/15"
        iconStyles={isDragActive ? "text-primary" : ""}
        buttonText={isDragActive ? "DROP IT" : "Select File"}
        content={
          isDragActive ? (
            <p className="font-semibold">Yup You&apos;re Good drop it here</p>
          ) : (
            <p className="font-semibold">
              Drop your files here or{" "}
              <span className="text-primary cursor-pointer font-bold">
                click to upload
              </span>
            </p>
          )
        }
      /> */}

      <UploaderState
        state={UPLOADER_STATE.ERROR}
        icon={Image}
        bgStyles="bg-destructive/50"
        iconStyles={"text-destructive"}
        buttonText={"Try Again!"}
        btnStyles="bg-destructive"
        content={
          <>
            <p className="-mb-3.5 font-semibold">Upload Failed</p>
            <p className="text-muted-foreground">Something went wrong</p>
          </>
        }
      />
    </article>
  );
}
