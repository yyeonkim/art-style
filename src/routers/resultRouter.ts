import express, { Request, Response } from "express";
import { IArtWork } from "../types";
import { getResult } from "../controller/result";

const resultRouter = express.Router();

let url = "";
let artWorks: IArtWork[] = [];

resultRouter.post("/", async (req: Request, res: Response) => {
  const data = req.body;
  url = data.image;

  // 각 라벨(클래스)마다 저장소에서 이미지 가져오기
  const labels = data.result.predicted_classes;
  artWorks = await getResult(labels);

  res.send("ok");
});

resultRouter.get("/", (req: Request, res: Response) => {
  res.render("result", { url, artWorks });
});

export default resultRouter;
