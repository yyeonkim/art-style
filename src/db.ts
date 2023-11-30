import { Storage, File } from "@google-cloud/storage";

const projectId = process.env.PROJECT_ID;
const keyFilename = "secure/gcs-key-filename.json";

const storage = new Storage({
  projectId,
  keyFilename,
});
const bucketName = "art-work-bucket";

async function generateSignedUrl(folderName: string) {
  const [files] = await storage
    .bucket(bucketName)
    .getFiles({ prefix: folderName });

  const fileUrls = files.map((file: File) => file.publicUrl());

  return fileUrls;
}

export { generateSignedUrl };
