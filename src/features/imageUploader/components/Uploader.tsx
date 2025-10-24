import { useReducer } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";
import axios from "axios";
import { CloudUpload, Image } from "lucide-react";
import { toast } from "sonner";
import UploaderState, {
  UPLOADER_STATE,
} from "@/features/imageUploader/components/UploaderStates/UploaderState";
import {
  ActionType,
  reducer as uploadedImageReducer,
  UploadFileType,
} from "@/features/imageUploader/slice/UploadedFileSlice";
import { cn } from "@/lib/utils";

const URL_UPLOAD = "http://localhost:3000/api/s3/upload";

const handleOnDropAccepted = async function (
  dispatch: React.ActionDispatch<[ActionType]>,
  files: File[],
) {
  const file = files[0];

  const url = await handleFileUpload(dispatch, file);

  console.log("UPLOAD ===> ", url);
};

const handleOnDropRejected = function (
  dispatch: React.ActionDispatch<[ActionType]>,
  files: FileRejection[],
) {
  const file = files[0];
  const errorCode = file.errors[0].code;

  dispatch({ type: "rejected" });

  if (errorCode === "file-too-large")
    return toast.error("File is larger than 15mb");

  if (errorCode === "file-invalid-type")
    return toast.error("Invalid file type");

  console.log("Error => ", file.errors);

  return toast.error("Something Went Wrong");
};

const handleFileUpload = async function (
  dispatch: React.ActionDispatch<[ActionType]>,
  file: File,
) {
  try {
    const {
      data: { presignedURL },
    } = await axios.post(URL_UPLOAD, {
      fileName: file.name,
      contentType: file.type,
      size: file.size,
      isImage: true,
    });

    dispatch({
      type: "accepted",
      payload: {
        fileName: file.name,
        fileType: file.type,
        size: file.size,
      },
    });

    const uploadProgress = axios.put(presignedURL, file, {
      onUploadProgress: ({ loaded, total }) => {
        dispatch({
          type: "progress",
          payload: Math.round((loaded / total!) * 100),
        });
      },
    });

    toast.promise(uploadProgress, {
      loading: "Uploading your file.",
      success: "Your File Uploaded Successfully",
      error: "Something Went Wrong. Try Again!",
    });

    await uploadProgress;

    return presignedURL;
  } catch (error) {
    console.log(error);
    dispatch({ type: "rejected" });
  }
};

const initialUploadedImage: UploadFileType = {
  fileName: null,
  fileType: null,
  size: null,
  progress: 0,
  uploading: false,
  error: false,
};

export default function Uploader() {
  const [uploadedImage, dispatch] = useReducer(
    uploadedImageReducer,
    initialUploadedImage,
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxSize: 15 * 1048576, // max Size of 15mb
    multiple: false,
    onDropAccepted: handleOnDropAccepted.bind(null, dispatch),
    onDropRejected: handleOnDropRejected.bind(null, dispatch),
  });

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
      {uploadedImage.error ? (
        <UploaderState
          state={UPLOADER_STATE.ERROR}
          icon={Image}
          bgStyles="bg-destructive/50"
          iconStyles={"text-destructive"}
          buttonText={"Try Again!"}
          btnStyles="bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
          content={
            <>
              <p className="-mb-3.5 font-semibold">Upload Failed</p>
              <p className="text-muted-foreground">Something went wrong</p>
            </>
          }
        />
      ) : (
        <UploaderState
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
        />
      )}
    </article>
  );
}
