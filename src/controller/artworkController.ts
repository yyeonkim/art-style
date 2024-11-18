import { Request, Response } from "express";
import axios from "axios";
import { File } from "@google-cloud/storage";

import { getFiles } from "../db";
import { ARTIST, LABEL } from "../constants";
import { IArtwork } from "../types";
import { apiKey } from "../env";
import Artwork from "../model/artwork";

const ROBOFLOW_URL =
  "https://classify.roboflow.com/art-style-and-artist-ljptt/1";

async function renderHome(req: Request, res: Response) {
  const artworks = await search(LABEL.IMPRESSIONIST);

  res.render("home", { artworks });
}

async function getArtwork(req: Request, res: Response) {
  const imgUrl = req.query.target;
  const arrayBuffer = await covertToArrayBuffer(imgUrl as string);
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const response = await postRoboflow(base64);
  const labels = response.data.predicted_classes;
  const artworks = await getSimilarArtwork(labels);

  res.render("artwork", { imgSrc: imgUrl, artworks });
}

/* 각 라벨(클래스)마다 저장소에서 이미지 가져오기 */
async function getSimilarArtwork(labels: LABEL[]) {
  const result: IArtwork[] = [];

  for (const label of labels) {
    const files = await search(label);
    result.push(...files);
  }

  return result;
}

function renderSearch(req: Request, res: Response) {
  res.render("search");
}

async function covertToArrayBuffer(imageUrl: string) {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();

  return arrayBuffer;
}

/**
 * Roboflow API 요청하기
 * @param {string} image base64로 인코딩되어야 함
 */
async function postRoboflow(image: string) {
  const response = await axios({
    method: "POST",
    url: ROBOFLOW_URL,
    params: { api_key: apiKey },
    data: image,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response;
}

/* 라벨에 따라 작품 검색 및 반환 */
async function search(label: LABEL): Promise<IArtwork[]> {
  const [files] = await getFiles(label);

  const artworks = files.map((file: File) => {
    return new Artwork({
      name: file.name,
      category: label,
      url: file.publicUrl(),
      artist: ARTIST.CAMILLE_PISSARRO,
      label: [label],
    });
  });

  return artworks;
}

async function postArtwork(req: Request, res: Response) {
  const imgBlob = req.body as Buffer;
  const base64 = imgBlob.toString("base64");
  const response = await postRoboflow(base64);
  const predictedClasses = response.data.predicted_classes;

  res.json({ predictedClasses });
}

export {
  renderHome,
  getArtwork,
  getSimilarArtwork,
  renderSearch,
  postRoboflow,
  search,
  postArtwork,
};
