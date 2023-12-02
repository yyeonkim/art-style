import express, { Express, Request, Response } from "express";
import { getFiles } from "./db";
import { LABEL } from "./constants";
import apiRouter from "./routers/apiRouter";
import cors from "cors";

const app: Express = express();
const port = 5000;

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static("dist"));

app.get("/", async (req: Request, res: Response) => {
  const artWorks = await getFiles(LABEL.IMPRESSIONIST);

  res.render("home", { artWorks });
});

app.use("/api", apiRouter);

app.get("/search", (req: Request, res: Response) => {
  res.render("search");
});
app.get("/result", (req: Request, res: Response) => {
  const data = req.body;
  res.render("result", { data });
});
app.get("/art-detail", (req: Request, res: Response) => {
  res.render("art-detail");
});
app.get("/artist", (req: Request, res: Response) => {
  res.render("artist");
});

app.listen(port, () => {
  console.log(`🎉 Server is listening on port:${port}`);
});
