import { Storage, File } from "@google-cloud/storage";
import { ARTIST, CATEGORY } from "./constants";
import { IArtWork } from "./types";
import { projectId } from "./env";

const keyFilename = "secure/gcs-key-filename.json";
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucketName = "art-work-bucket";

async function getFiles(folderName: string): Promise<IArtWork[]> {
  const [files] = await storage
    .bucket(bucketName)
    .getFiles({ prefix: folderName });

  const artWorks = files.map((file: File) => {
    return {
      name: file.name,
      category: CATEGORY.IMPRESSIONIST,
      url: file.publicUrl(),
      artist: ARTIST.CAMILLE_PISSARRO,
      label: [folderName],
    };
  });

  return artWorks;
}

export { getFiles };
