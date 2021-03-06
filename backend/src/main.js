require("dotenv").config();
import Koa from "koa";
import Router from "koa-router";
import api from "./api";
import mongoose from "mongoose";
import jwtMiddleware from "./lib/jwtMiddleware";
import koaBody from "koa-body";
import serve from "koa-static";
import fs from "fs";
import path from "path";
import send from "koa-send";
import koaHelmet from "koa-helmet";

const { PORT, MONGO_URI } = process.env;
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

app.use(koaHelmet({
  hsts: false
}));
app.use(jwtMiddleware);
app.use(
  koaBody({
    formLimit: "1mb",
    formidable: {
      uploadDir: path.join(__dirname, "uploads"), // upload directory
      keepExtensions: true, // keep file extensions
      // 중복된 파일명 숫자 붙이기
      onFileBegin: (uploadName, uploadFile) => {
        const file = uploadFile.name;
        const splitFile = file.split(".");
        const name = splitFile[0];
        const extension = splitFile[1];
        const fileList = fs.readdirSync(path.join(__dirname, "uploads", ""));
        const numArr = [];
        let uploadFileName;

        // 파일명이 있는 경우
        if (fs.existsSync(path.join(__dirname, "uploads", file))) {
          for (const index in fileList) {
            const savedFile = fileList[index];
            const splitSavedFile = savedFile.split(".");
            const savedName = splitSavedFile[0];
            const nameNum = savedName.split("_")[1];

            // 중첩된 파일명이 여러개일 경우
            if (savedName.indexOf(name + "_") > -1) {
              // 파일명 끝 숫자만 배열에 넣기
              if (parseInt(nameNum)) {
                numArr.push(nameNum);
              }
            }
            // 중첩된 파일명이 1개일 경우
            else {
              numArr.push(0);
            }
          }
          uploadFileName =
            name + "_" + (Math.max.apply(null, numArr) + 1) + "." + extension;
          console.log("main-uploadFileName ", uploadFileName);
        }
        // 파일명이 없는 경우
        else {
          uploadFileName = file;
        }

        uploadFile.path = path.join(__dirname, "uploads", uploadFileName);
      },
    },
    multipart: true,
  })
);
app.use(serve("./src/uploads"));

// 라우터 설정
router.use("/api", api.routes());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, "../../frontend/build");
app.use(serve(buildDirectory));
app.use(async ctx => {
  console.log("ctx.status",ctx.status);
  // Not Found이고, 주소가 /api로 시작하지 않는 경우
  if(ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    // index.html 내용을 반환
    console.log(404, buildDirectory);
    await send(ctx, 'index.html', {root: buildDirectory});
  }
})

// 포트가 지정되어 있지 않다면 4000을 사용
const port = PORT || 4000;
app.listen(port, () => {
  console.log("Listening to port", port);
});
