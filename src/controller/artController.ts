import { Request, Response } from "express";
import { convertToBase64, getResult, postRoboflow } from "./searchController";
import { getFiles } from "../db";
import { LABEL } from "../constants";

async function getHomeArtWork(req: Request, res: Response) {
  const artworks = await getFiles(LABEL.IMPRESSIONIST);

  res.render("home", { artworks });
}

async function getDetail(req: Request, res: Response) {
  const url = req.query.target;
  const base64 = await convertToBase64(url as string);
  const response = await postRoboflow(base64);
  const labels = response.data.predicted_classes;
  const artworks = await getResult(labels);

  res.render("art-detail", { url, artworks });
}

export { getHomeArtWork, getDetail };
