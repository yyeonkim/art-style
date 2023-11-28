import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 5000;

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`🎉 Server is listening on port:${port}`);
});
