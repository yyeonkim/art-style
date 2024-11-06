import express, { Express } from "express";
import cors from "cors";

import apiRouter from "./routers/apiRouter";
import artworkRouter from "./routers/artworkRouter";
import artistRouter from "./routers/artistRouter";
import rootRouter from "./routers/rootRouter";

const app: Express = express();
const port = 5000;

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static("dist"));
app.use(
  "/api/artwork",
  express.raw({ type: "application/octet-stream", limit: "5mb" })
);

app.use("/", rootRouter);
app.use("/api", apiRouter);
app.use("/artwork", artworkRouter);
app.use("/artist", artistRouter);

app.listen(port, () => {
  console.log(`🎉 Server is listening on port:${port}`);
});
