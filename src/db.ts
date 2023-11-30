const { Storage } = require("@google-cloud/storage");

const projectId = process.env.PROJECT_ID;
const keyFilename = "secure/gcs-key-filename.json";

const storage = new Storage({
  projectId,
  keyFilename,
});
const bucketName = "art-work-bucket";
const folderPath = "camille_pissarro";

async function generateSignedUrl() {
  const [files] = await storage
    .bucket(bucketName)
    .getFiles({ prefix: folderPath });
}

export { generateSignedUrl };
