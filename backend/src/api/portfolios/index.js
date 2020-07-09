import Router from "koa-router";
import * as portfoliosCtrl from "./portfolios.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

const portfolios = new Router();

portfolios.post("/", checkLoggedIn, portfoliosCtrl.write);
portfolios.get("/idCheck/:id", portfoliosCtrl.idCheck);
portfolios.get("/", portfoliosCtrl.list);
portfolios.get("/category", portfoliosCtrl.category);

const portfolio = new Router();

portfolio.get("/", portfoliosCtrl.read);
portfolio.delete("/", checkLoggedIn, portfoliosCtrl.remove);
portfolio.patch("/", checkLoggedIn, portfoliosCtrl.update);

portfolios.use("/:id", portfoliosCtrl.getPortfolioById, portfolio.routes());

export default portfolios;
