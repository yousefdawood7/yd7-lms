"use server";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/lib/env";
import { S3 } from "@/lib/s3";

export async function DeleteUploadedImage(imageUrl: string) {
  const Key = imageUrl.split("/").pop();

  try {
    const test = await S3.send(
      new DeleteObjectCommand({
        Bucket: env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: Key,
      }),
    );

    console.log(test);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
