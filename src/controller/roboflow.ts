import { Request, Response } from "express";
import axios from "axios";
import fs from "fs";
import { apiKey } from "../env";

const url = "https://classify.roboflow.com/art-style-and-artist-ljptt/1";

/* Roboflow에서 분석한 결과를 json으로 전달 */
async function searchUrl(req: Request, res: Response) {
  const imageUrl = req.body.image;
  const base64 = await convertToBase64(imageUrl);
  const response = await postRoboflow(base64);

  res.json(response.data);
}

async function convertToBase64(imgUrl: string) {
  const response = await fetch(imgUrl);
  const contentType = response.headers.get("content-type");
  const blob = await response.arrayBuffer();

  return `data:${contentType};base64,${Buffer.from(blob).toString("base64")}`;
}

async function searchFile(req: Request, res: Response) {
  // base64로 인코딩
  const filePath = req.file?.path;
  const data = fs.readFileSync(filePath as string, {
    encoding: "base64",
  });

  const response = await postRoboflow(data);

  res.json(response.data);
}

async function postRoboflow(data: string) {
  // Roboflow API
  const response = await axios({
    method: "POST",
    url,
    params: { api_key: apiKey },
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response;
}

export { searchUrl, searchFile };
