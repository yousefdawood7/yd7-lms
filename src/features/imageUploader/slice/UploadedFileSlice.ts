export type UploadFileType = {
  fileName: string | null;
  fileType: string | null;
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
    | { fileName: string; fileType: string; size: number };
};

export function reducer(
  prevState: UploadFileType,
  action: ActionType,
): UploadFileType {
  switch (action.type) {
    case "accepted": {
      if (typeof action.payload === "object")
        return {
          ...prevState,
          uploading: true,
          progress: 0,
          fileName: action.payload.fileName,
          fileType: action.payload.fileType,
          size: action.payload.size,
          error: false,
        };
      throw new Error("Provide A Valid Payload");
    }

    case "rejected":
      return { ...prevState, error: true };
    default:
      throw new Error("Dispatched Unknown Event");
  }
}
