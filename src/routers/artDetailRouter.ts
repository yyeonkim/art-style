import express from "express";
import { getDetail } from "../controller/artController";

const artDetailRouter = express.Router();

artDetailRouter.get("/", getDetail);

export default artDetailRouter;
