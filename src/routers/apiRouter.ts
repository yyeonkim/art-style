import express, { Request, Response } from "express";
import multer from "multer";
import { getFiles } from "../db";
import { searchFile, searchUrl } from "../controller/searchController";
import { getResult } from "../controller/searchController";

const apiRouter = express.Router();
const upload = multer({ dest: "uploads/" });

apiRouter.get("/artworks/:category", async (req: Request, res: Response) => {
  const artworks = await getFiles(req.params.category);

  res.json(artworks);
});

apiRouter.post("/search/file", upload.single("image"), searchFile);
apiRouter.post("/search/url", searchUrl);

apiRouter.post("/result", getResult);

export default apiRouter;
