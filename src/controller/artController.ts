import { Request, Response } from "express";
import { handleUrl, postRoboflow } from "./searchController";
import { getFiles } from "../db";
import { LABEL } from "../constants";
import { IArtwork } from "../types";

async function getHomeArtWork(req: Request, res: Response) {
  const artworks = await getFiles(LABEL.IMPRESSIONIST);

  res.render("home", { artworks });
}

async function getDetail(req: Request, res: Response) {
  const url = req.query.target;
  const base64 = await handleUrl(url as string);
  const response = await postRoboflow(base64 as string);
  const labels = response.data.predicted_classes;
  const artworks = await getSimilarArtwork(labels);

  res.render("art-detail", { url, artworks });
}

/* 각 라벨(클래스)마다 저장소에서 이미지 가져오기 */
async function getSimilarArtwork(labels: string[]) {
  const result: IArtwork[] = [];

  for (const label of labels) {
    const files = await getFiles(label);
    result.push(...files);
  }

  return result;
}

export { getHomeArtWork, getDetail, getSimilarArtwork };
