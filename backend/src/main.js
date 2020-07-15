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
      onFileBegin: (name, file) => {
        const addedFileName = file.name;
        const splitAddedFileName = addedFileName.split(".");
        const fileLists = fs.readdirSync(__dirname + "\\uploads\\");
        const number = [];
        let uploadFileName;

        if (fs.existsSync(__dirname + "\\uploads\\" + addedFileName)) {
          console.log("existsSync - true");
          for (const index in fileLists) {
            const savedFileName = fileLists[index];
            const splitSavedFileName = savedFileName.split(".");
            const onlyName = splitSavedFileName[0];
            if (onlyName.indexOf(splitAddedFileName[0]) > -1) {
              if (onlyName.split("_")[1] === undefined) {
                number.push(0);
                continue;
              }
              number.push(onlyName.split("_")[1]);
            }
          }
          uploadFileName =
            splitAddedFileName[0] +
            "_" +
            (Math.max.apply(null, number) + 1) +
            "." +
            splitAddedFileName[1];
        } else {
          uploadFileName = addedFileName;
        }

        file.path = __dirname + `\\uploads\\${uploadFileName}`;
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
