import express, { Express, Request, Response } from "express";
import { generateSignedUrl } from "./db";

const app: Express = express();
const port = 5000;

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(express.json());
app.use(express.static("dist"));

generateSignedUrl().catch(console.error);

app.get("/", (req: Request, res: Response) => {
  res.render("home");
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
