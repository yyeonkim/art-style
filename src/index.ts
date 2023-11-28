import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript with Express");
});

app.listen(port, () => {
  console.log(`🎉 Server is listening on port:${port}`);
});
