import { initialUploadedImage } from "@/features/imageUploader/components/Uploader";

export type UploadFileType = {
  fileName: string | null;
  fileType: string | null;
  imageUrl: string | null;
  objectUrl: string | null;
  size: number | null;
  uploading: boolean;
  progress: number;
  error: boolean;
};

export type ActionType = {
  type: string;
  payload?:
    | string
    | number
    | { type: "accepted"; fileName: string; fileType: string; size: number }
    | { type: "finished"; imageUrl: string; objectUrl: string };
};

export function reducer(
  prevState: UploadFileType,
  action: ActionType,
): UploadFileType {
  switch (action.type) {
    case "accepted": {
      if (
        typeof action.payload === "object" &&
        action.payload.type === "accepted"
      )
        return {
          ...prevState,
          progress: 0,
          fileName: action.payload.fileName,
          fileType: action.payload.fileType,
          size: action.payload.size,
          error: false,
        };
      throw new Error("Provide A Valid Payload");
    }

    case "progress": {
      if (typeof action.payload !== "number")
        throw new Error("Provide A Valid Payload");
      return {
        ...prevState,
        uploading: true,
        progress: action.payload,
      };
    }

    case "finished": {
      if (
        typeof action.payload === "object" &&
        action.payload.type === "finished"
      )
        return {
          ...prevState,
          uploading: false,
          imageUrl: action.payload.imageUrl,
          objectUrl: action.payload.objectUrl,
        };
      throw new Error("Provide A Valid Payload");
    }

    case "rejected":
      return { ...prevState, error: true };

    case "reset":
      return { ...initialUploadedImage };

    default:
      throw new Error("Dispatched Unknown Event");
  }
}
