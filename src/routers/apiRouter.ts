import express, { Request, Response } from "express";
import multer from "multer";
import { getFiles } from "../db";
import { searchFile, searchUrl } from "../controller/roboflow";
import { getResult } from "../controller/result";

const apiRouter = express.Router();
const upload = multer({ dest: "uploads/" });

apiRouter.get("/artworks/:category", async (req: Request, res: Response) => {
  const artWorks = await getFiles(req.params.category);

  res.json(artWorks);
});

apiRouter.post("/search/file", upload.single("image"), searchFile);
apiRouter.post("/search/url", searchUrl);

apiRouter.post("/result", getResult);

export default apiRouter;
