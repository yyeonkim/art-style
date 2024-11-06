import { Request, Response } from "express";
import axios from "axios";
import sharp, { SharpOptions } from "sharp";
import fs from "fs";
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

async function getDetail(req: Request, res: Response) {
  const url = req.query.target;
  const base64 = await handleUrl(url as string);
  const response = await postRoboflow(base64 as string);
  const labels = response.data.predicted_classes;
  const artworks = await getSimilarArtwork(labels);

  res.render("artwork", { url, artworks });
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

async function handleUrl(imageUrl: string) {
  const arrayBuffer = await covertToArrayBuffer(imageUrl);
  const resized = await resizeImage(arrayBuffer, 640, 640);
  const base64 = Buffer.from(resized).toString("base64");

  return base64;
}

/* 이미지 파일 검색 */
async function searchFile(req: Request, res: Response) {
  const file = req.file;
  const readFile = fs.readFileSync(`./uploads/${file?.filename}`);
  const resized = await resizeImage(readFile, 640, 640);
  const base64 = Buffer.from(resized).toString("base64");
  const response = await postRoboflow(base64);

  res.json(response.data);
}

async function covertToArrayBuffer(imageUrl: string) {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();

  return arrayBuffer;
}

/* 이미지 크기 조정 */
async function resizeImage(
  image: ArrayBuffer | Buffer,
  width: number,
  height: number
) {
  const result = await sharp(image as SharpOptions)
    .resize({ width, height, fit: "fill" })
    .toBuffer();

  return result;
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

  res.json(response.data);
}

export {
  renderHome,
  getDetail,
  getSimilarArtwork,
  renderSearch,
  searchFile,
  handleUrl,
  postRoboflow,
  search,
  postArtwork,
};
