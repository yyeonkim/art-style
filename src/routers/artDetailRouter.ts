import express from "express";
import { getDetail } from "../controller/artDetail";

const artDetailRouter = express.Router();

artDetailRouter.get("/", getDetail);

export default artDetailRouter;
