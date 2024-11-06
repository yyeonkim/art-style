import express from "express";

import { getHomeArtWork } from "../controller/artController";
import { renderSearch } from "../controller/searchController";

const rootRouter = express.Router();

rootRouter.get("/", getHomeArtWork);
rootRouter.get("/search", renderSearch);

export default rootRouter;
