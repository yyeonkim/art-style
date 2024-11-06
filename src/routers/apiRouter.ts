import express, { Request, Response } from "express";
import multer from "multer";

import {
  getSimilarArtwork,
  postArtwork,
  search,
  searchFile,
} from "../controller/artworkController";
import { LABEL } from "../constants";

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
  const artworks = await search(req.query.category as LABEL);
  res.json(artworks);
});
apiRouter.post("/artwork", postArtwork);
apiRouter.post("/search/file", upload.single("image"), searchFile);
apiRouter.post("/result", getSimilarArtwork);

export default apiRouter;
