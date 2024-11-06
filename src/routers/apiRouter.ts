import express, { Request, Response } from "express";

import {
  getSimilarArtwork,
  postArtwork,
  search,
} from "../controller/artworkController";
import { LABEL } from "../constants";

const apiRouter = express.Router();

apiRouter.get("/artworks", async (req: Request, res: Response) => {
  const artworks = await search(req.query.category as LABEL);
  res.json(artworks);
});
apiRouter.post("/artwork", postArtwork);
apiRouter.post("/result", getSimilarArtwork);

export default apiRouter;
