require("dotenv").config();
import Koa from "koa";
import Router from "koa-router";
import api from "./api";
import mongoose from "mongoose";
import jwtMiddleware from "./lib/jwtMiddleware";
import koaBody from "koa-body";
import serve from "koa-static";
import fs from "fs";

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

app.use(jwtMiddleware);
app.use(
  koaBody({
    formLimit: "1mb",
    formidable: {
      uploadDir: __dirname + "\\uploads", // upload directory
      maxFileSize: 200 * 1024 * 1024, //Upload file size
      keepExtensions: true, // keep file extensions
      // 중복된 파일명 숫자 붙이기
      onFileBegin: (uploadName, uploadFile) => {
        const file = uploadFile.name;
        const splitFile = file.split(".");
        const name = splitFile[0];
        const extension = splitFile[1];
        const fileList = fs.readdirSync(__dirname + "\\uploads\\");
        const numArr = [];
        let uploadFileName;

        // 파일명이 있는 경우
        if (fs.existsSync(__dirname + "\\uploads\\" + file)) {
          for (const index in fileList) {
            const savedFile = fileList[index];
            const splitSavedFile = savedFile.split(".");
            const savedName = splitSavedFile[0];
            // 파일명이 포함되는 경우
            if (savedName.indexOf(name) > -1) {
              // 중복된 파일이 1개일 경우
              if (savedName.split("_")[1] === undefined) {
                numArr.push(0);
                continue;
              }
              // 파일명 끝 숫자만 배열에 넣기
              numArr.push(savedName.split("_")[1]);
            }
          }
          uploadFileName =
            name + "_" + (Math.max.apply(null, numArr) + 1) + "." + extension;
        }
        // 파일명이 없는 경우
        else {
          uploadFileName = file;
        }

        uploadFile.path = __dirname + `\\uploads\\${uploadFileName}`;
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

const port = PORT || 4000;
app.listen(port, () => {
  console.log("Listening to port", port);
});
