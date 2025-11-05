"use server";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { isValidAccess } from "@/features/auth/data/access/data-access";
import { env } from "@/lib/env";
import { S3 } from "@/lib/s3";

export async function DeleteUploadedImage(imageUrl: string) {
  const validateObject = await isValidAccess("delete");

  const Key = imageUrl.split("/").pop();

  try {
    // prettier-ignore
    if (validateObject.error)
      throw new Error(validateObject.message);

    await S3.send(
      new DeleteObjectCommand({
        Bucket: env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: Key,
      }),
    );
  } catch (error) {
    console.log(error);

    // prettier-ignore
    if (error instanceof Error)
      throw new Error(error.message);
    throw new Error("Failed to delete image");
  }
}
