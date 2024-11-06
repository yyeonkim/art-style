import express, { Express } from "express";
import cors from "cors";
import apiRouter from "./routers/apiRouter";
import resultRouter from "./routers/resultRouter";
import artDetailRouter from "./routers/artDetailRouter";
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

app.get("/", rootRouter);
app.use("/api", apiRouter);
app.use("/result", resultRouter);
app.use("/artwork", artDetailRouter);
app.get("/artist", artistRouter);

app.listen(port, () => {
  console.log(`🎉 Server is listening on port:${port}`);
});
