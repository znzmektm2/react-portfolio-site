import Router from "koa-router";
import * as portfolioCtrl from "./portfolio.ctrl";

const portfolio = new Router();

portfolio.post("/", portfolioCtrl.write);
portfolio.get("/", portfolioCtrl.list);

export default portfolio;
