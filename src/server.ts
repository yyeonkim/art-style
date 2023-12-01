import express, { Express, Request, Response } from "express";
import { getFiles } from "./db";
import { LABEL } from "./constants";

const app: Express = express();
const port = 5000;

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(express.json());
app.use(express.static("dist"));

app.get("/", async (req: Request, res: Response) => {
  const artWorks = await getFiles(LABEL.IMPRESSIONIST);

  res.render("home", { artWorks });
});

app.get("/api/artworks/:category", async (req: Request, res: Response) => {
  const artWorks = await getFiles(req.params.category);

  res.json(artWorks);
});

app.get("/search", (req: Request, res: Response) => {
  res.render("search");
});
app.get("/result", (req: Request, res: Response) => {
  res.render("result");
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
