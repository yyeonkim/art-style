import express, { Request, Response } from "express";
import { convertToBase64, postRoboflow } from "../controller/roboflow";
import { getResult } from "../controller/result";

const artDetailRouter = express.Router();

artDetailRouter.get("/", async (req: Request, res: Response) => {
  const url = req.query.target;
  const base64 = await convertToBase64(url as string);
  const response = await postRoboflow(base64);
  const labels = response.data.predicted_classes;
  const artWorks = await getResult(labels);

  res.render("art-detail", { url, artWorks });
});

export default artDetailRouter;