import express, { Request, Response } from "express";
import multer from "multer";

import { getFiles } from "../db";
import {
  getSimilarArtwork,
  searchFile,
  searchUrl,
} from "../controller/artworkController";

const apiRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

apiRouter.get("/artworks", async (req: Request, res: Response) => {
  const artworks = await getFiles(req.query.category as string);

  res.json(artworks);
});

apiRouter.post("/search/file", upload.single("image"), searchFile);
apiRouter.post("/search/url", searchUrl);

apiRouter.post("/result", getSimilarArtwork);

export default apiRouter;
