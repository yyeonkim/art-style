import { Request, Response } from "express";
import axios from "axios";
import sharp, { SharpOptions } from "sharp";
import fs from "fs";
import { apiKey } from "../env";

const url = "https://classify.roboflow.com/art-style-and-artist-ljptt/1";

function renderSearch(req: Request, res: Response) {
  res.render("search");
}

/* 이미지 주소 검색 */
async function searchUrl(req: Request, res: Response) {
  const imageUrl = req.body.image;
  const base64 = await handleUrl(imageUrl);
  const response = await postRoboflow(base64);

  res.json(response.data);
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
  const resized = await resizeImage(readFile as Buffer, 640, 640);
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
    url,
    params: { api_key: apiKey },
    data: image,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response;
}

export { renderSearch, searchUrl, searchFile, handleUrl, postRoboflow };
