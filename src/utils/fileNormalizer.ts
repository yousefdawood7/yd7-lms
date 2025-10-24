import { v4 as uuid } from "uuid";

export function fileNormalizer(fileName: string): string {
  const normalizedFileName = uuid() + "-" + fileName.replaceAll(" ", "-");
  return normalizedFileName;
}
