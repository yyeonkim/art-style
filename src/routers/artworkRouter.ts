import express from "express";
import { getArtwork } from "../controller/artworkController";

const artworkRouter = express.Router();

artworkRouter.get("/", getArtwork);

export default artworkRouter;
