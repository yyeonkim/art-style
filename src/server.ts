import express, { Express, Request, Response } from "express";
import cors from "cors";
import apiRouter from "./routers/apiRouter";
import resultRouter from "./routers/resultRouter";
import artDetailRouter from "./routers/artDetailRouter";
import { getHomeArtWork } from "./controller/artController";
import { renderSearch } from "./controller/searchController";

const app: Express = express();
const port = 5000;

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static("dist"));

app.get("/", getHomeArtWork);
app.use("/api", apiRouter);
app.use("/result", resultRouter);
app.use("/art-detail", artDetailRouter);
app.get("/search", renderSearch);
app.get("/artist", (req: Request, res: Response) => {
  res.render("artist");
});

app.listen(port, () => {
  console.log(`🎉 Server is listening on port:${port}`);
});
