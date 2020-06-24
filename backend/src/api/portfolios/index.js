import Router from "koa-router";
import * as portfoliosCtrl from "./portfolios.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

const portfolios = new Router();

portfolios.post("/", checkLoggedIn, portfoliosCtrl.write);
portfolios.get("/", portfoliosCtrl.list);

export default portfolios;
