import { Storage, File } from "@google-cloud/storage";
import { ARTIST, CATEGORY, LABEL } from "./constants";

const projectId = process.env.PROJECT_ID;
const keyFilename = "secure/gcs-key-filename.json";

const storage = new Storage({
  projectId,
  keyFilename,
});
const bucketName = "art-work-bucket";

async function getArtWorks(folderName: string) {
  const [files] = await storage
    .bucket(bucketName)
    .getFiles({ prefix: folderName });

  const artWorks = files.map((file: File) => {
    return {
      name: file.name,
      category: CATEGORY.IMPRESSIONIST,
      url: file.publicUrl(),
      artist: ARTIST.CAMILLE_PISSARRO,
      label: [LABEL.IMPRESSIONIST, LABEL.CAMILLE_PISSARRO],
    };
  });

  return artWorks;
}

export { getArtWorks };
