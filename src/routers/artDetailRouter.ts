import express from "express";
import { getDetail } from "../controller/artworkController";

const artDetailRouter = express.Router();

artDetailRouter.get("/", getDetail);

export default artDetailRouter;
