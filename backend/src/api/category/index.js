import Router from "koa-router";
import * as categoryCtrl from "./category.ctrl";

const category = new Router();

category.post("/", categoryCtrl.add);
category.get("/", categoryCtrl.list);

export default category;
