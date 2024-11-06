import express, { Request, Response } from "express";

import {
  getHomeArtWork,
  getSimilarArtwork,
} from "../controller/artworkController";
import { renderSearch } from "../controller/searchController";
import { IArtwork } from "../types";

const rootRouter = express.Router();
let url = "";
let artworks: IArtwork[] = [];

rootRouter.get("/", getHomeArtWork);
rootRouter.get("/search", renderSearch);

rootRouter.post("/result", async (req: Request, res: Response) => {
  const data = req.body;
  url = data.image;

  // 각 라벨(클래스)마다 저장소에서 이미지 가져오기
  const labels = data.result.predicted_classes;
  artworks = await getSimilarArtwork(labels);

  res.send("ok");
});
rootRouter.get("/result", (req: Request, res: Response) => {
  res.render("result", { url, artworks });
});

export default rootRouter;
