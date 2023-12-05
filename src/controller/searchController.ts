import { Request, Response } from "express";
import axios from "axios";
import fs from "fs";
import { apiKey } from "../env";
import { getFiles } from "../db";
import { IArtwork } from "../types";
import sharp from "sharp";

const url = "https://classify.roboflow.com/art-style-and-artist-ljptt/1";

function renderSearch(req: Request, res: Response) {
  res.render("search");
}

/* 이미지 주소 검색 */
async function searchUrl(req: Request, res: Response) {
  const imageUrl = req.body.image;
  const response = await postRoboflow(imageUrl);

  res.json(response.data);
}

async function covertToArrayBuffer(imageUrl: string) {
  const response = await fetch(imageUrl);
  const contentType = response.headers.get("content-type");
  const arrayBuffer = await response.arrayBuffer();

  return { arrayBuffer, contentType };
}

async function convertToBase64(contentType: string, buffer: Buffer) {
  return `data:${contentType};base64,${Buffer.from(buffer).toString("base64")}`;
}

/* 이미지 크기 조정 */
async function resizeImage(
  image: string | ArrayBuffer,
  width: number,
  height: number
) {
  const result = await sharp(image)
    .resize({ width, height, fit: "fill" })
    .toBuffer();

  return result;
}

/* 이미지 파일 검색 */
async function searchFile(req: Request, res: Response) {
  const filePath = req.file?.path;
  const response = await postRoboflow(filePath as string);

  res.json(response.data);
}

async function postRoboflow(image: string) {
  const { arrayBuffer, contentType } = await covertToArrayBuffer(image);
  const resized = await resizeImage(arrayBuffer, 640, 640);
  const base64 = await convertToBase64(contentType as string, resized);
  // Roboflow API
  const response = await axios({
    method: "POST",
    url,
    params: { api_key: apiKey },
    data: base64,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response;
}

/* 각 라벨(클래스)마다 저장소에서 이미지 가져오기 */
async function getResult(labels: string[]) {
  const result: IArtwork[] = [];

  for (const label of labels) {
    const files = await getFiles(label);
    result.push(...files);
  }

  return result;
}

export { renderSearch, searchUrl, searchFile, postRoboflow, getResult };
