import express, { Request, Response } from "express";

import { IArtwork } from "../types";
import { getSimilarArtwork } from "../controller/artController";

const resultRouter = express.Router();

let url = "";
let artworks: IArtwork[] = [];

resultRouter.post("/", async (req: Request, res: Response) => {
  const data = req.body;
  url = data.image;

  // 각 라벨(클래스)마다 저장소에서 이미지 가져오기
  const labels = data.result.predicted_classes;
  artworks = await getSimilarArtwork(labels);

  res.send("ok");
});

resultRouter.get("/", (req: Request, res: Response) => {
  res.render("result", { url, artworks });
});

export default resultRouter;
