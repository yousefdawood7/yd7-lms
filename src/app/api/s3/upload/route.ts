import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/lib/env";
import { S3 } from "@/lib/s3";
import { fileUploadSchema } from "@/lib/zodSchemas";
import { fileNormalizer } from "@/utils/fileNormalizer";

export async function POST(req: Request) {
  try {
    const body = fileUploadSchema.safeParse(await req.json());

    if (body.error)
      return Response.json({ error: "Invalid File" }, { status: 400 });

    const presignerConfig = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: fileNormalizer(body.data.fileName),
      ContentType: body.data.contentType,
      ContentLength: body.data.size,
    });

    const presignedURL = await getSignedUrl(S3, presignerConfig, {
      expiresIn: 300, // will expire in 5 minutes
    });

    return Response.json(
      { message: "image validated successfully", presignedURL },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something Went Wrong" }, { status: 500 });
  }
}
