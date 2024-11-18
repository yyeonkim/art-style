import { Storage, GetFilesResponse } from "@google-cloud/storage";

import { projectId } from "./env";

const storage = new Storage({
  projectId,
  keyFilename: "secure/gcs-key-filename.json",
});

async function getFiles(folderName: string): Promise<GetFilesResponse> {
  return await storage
    .bucket("art-work-bucket")
    .getFiles({ prefix: folderName });
}

export { getFiles };
