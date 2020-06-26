require("dotenv").config();
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import api from "./api";
import mongoose from "mongoose";
import jwtMiddleware from "./lib/jwtMiddleware";
import koaBody from "koa-body";
import serve from "koa-static";
import path from "path";

const { PORT, MONGO_URI } = process.env;
console.log(MONGO_URI);
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

const app = new Koa();
const router = new Router();

app.use(jwtMiddleware);
app.use(
  koaBody({
    formLimit: "1mb",
    formidable: {
      uploadDir: "./uploads", // upload directory
      maxFileSize: 200 * 1024 * 1024, //Upload file size
      keepExtensions: true, // keep file extensions
    },
    multipart: true,
    urlencoded: true,
  })
);
app.use(serve("./uploads"));

// 라우터 설정
router.use("/api", api.routes());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
  console.log("Listening to port", port);
});
