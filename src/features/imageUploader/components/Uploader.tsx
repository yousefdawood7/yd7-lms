import { useReducer } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";
import axios from "axios";
import { CloudUpload, Image } from "lucide-react";
import { toast } from "sonner";
import { useSpinDelay } from "spin-delay";
import UploaderLoadingState from "@/features/imageUploader/components/UploaderStates/UploaderLoadingState";
import UploaderShowState from "@/features/imageUploader/components/UploaderStates/UploaderShowState";
import UploaderState from "@/features/imageUploader/components/UploaderStates/UploaderState";
import { URL_UPLOAD } from "@/features/imageUploader/constants/constants";
import {
  ActionType,
  reducer as uploadedImageReducer,
  UploadFileType,
} from "@/features/imageUploader/slice/UploadedFileSlice";
import { cn } from "@/lib/utils";

const handleOnDropAccepted = async function (
  dispatch: React.ActionDispatch<[ActionType]>,
  files: File[],
) {
  const file = files[0];
  await handleFileUpload(dispatch, file);
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
        type: "accepted",
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
    dispatch({
      type: "finished",
      payload: {
        type: "finished",
        imageUrl: presignedURL.split("?")[0],
        objectUrl: URL.createObjectURL(file),
      },
    });

    return presignedURL;
  } catch (error) {
    console.log(error);
    dispatch({ type: "rejected" });
  }
};

export const initialUploadedImage: UploadFileType = {
  fileName: null,
  fileType: null,
  imageUrl: null,
  objectUrl: null,
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

  const isUploading = useSpinDelay(uploadedImage.uploading, {
    delay: 300,
    minDuration: 350,
  });

  console.log(uploadedImage);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxSize: 15 * 1048576, // max Size of 15mb
    multiple: false,
    onDropAccepted: handleOnDropAccepted.bind(null, dispatch),
    onDropRejected: handleOnDropRejected.bind(null, dispatch),
    noDrag:
      uploadedImage.uploading ||
      uploadedImage.progress === 100 ||
      uploadedImage.imageUrl !== null,
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
      <input
        {...getInputProps({
          disabled: uploadedImage.uploading || uploadedImage.progress === 100,
        })}
      />
      {!isUploading &&
        uploadedImage.imageUrl &&
        uploadedImage.objectUrl &&
        uploadedImage.progress === 100 && (
          <UploaderShowState
            imageUrl={uploadedImage.imageUrl}
            objectUrl={uploadedImage.objectUrl}
            dispatch={dispatch}
          />
        )}

      {isUploading && uploadedImage.fileName && (
        <UploaderLoadingState
          fileName={uploadedImage.fileName}
          progress={uploadedImage.progress}
        />
      )}

      {uploadedImage.error && (
        <UploaderState
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
      )}

      {uploadedImage.imageUrl === null &&
        !uploadedImage.uploading &&
        !uploadedImage.error && (
          <UploaderState
            icon={CloudUpload}
            bgStyles="bg-secondary/50 dark:bg-muted-foreground/15"
            iconStyles={isDragActive ? "text-primary" : ""}
            buttonText={isDragActive ? "DROP IT" : "Select File"}
            content={
              isDragActive ? (
                <p className="font-semibold">
                  Yup You&apos;re Good drop it here
                </p>
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
