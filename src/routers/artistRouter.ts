import express, { Request, Response } from "express";

const artistRouter = express.Router();

artistRouter.get("/", (req: Request, res: Response) => {
  res.render("artist");
});

export default artistRouter;
