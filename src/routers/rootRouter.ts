import express, { Request, Response } from "express";

import {
  getSimilarArtwork,
  renderHome,
  renderSearch,
} from "../controller/artworkController";
import { IArtwork } from "../types";

const rootRouter = express.Router();

const result = {
  imgSrc: "",
  artworks: [] as IArtwork[],
};

rootRouter.get("/", renderHome);
rootRouter.get("/search", renderSearch);
rootRouter.get("/result", (req: Request, res: Response) => {
  res.render("result", result);
});

rootRouter.post("/result", async (req: Request, res: Response) => {
  const { image, classes } = req.body;

  result.imgSrc = image;
  // 각 라벨(클래스)마다 저장소에서 이미지 가져오기
  result.artworks = await getSimilarArtwork(classes);
  res.send("ok");
});

export default rootRouter;
