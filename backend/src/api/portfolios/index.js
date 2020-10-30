import Router from "koa-router";
import * as portfoliosCtrl from "./portfolios.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

const portfolios = new Router();

portfolios.post("/", checkLoggedIn, portfoliosCtrl.write);
portfolios.get("/idCheck/:id", portfoliosCtrl.idCheck);
portfolios.get("/", portfoliosCtrl.list);
portfolios.get("/category", portfoliosCtrl.category);
portfolios.get("/countPortfolio", portfoliosCtrl.countPortfolio);
portfolios.get("/clients", portfoliosCtrl.clients);
portfolios.get("/change", portfoliosCtrl.change);

const portfolio = new Router();

portfolio.get("/", portfoliosCtrl.read);
portfolio.delete("/", checkLoggedIn, portfoliosCtrl.remove);
portfolio.patch("/", checkLoggedIn, portfoliosCtrl.update);
portfolio.patch(
  "/removeClientImage",
  checkLoggedIn,
  portfoliosCtrl.removeClientImage
);

portfolios.use("/:id", portfoliosCtrl.getPortfolioById, portfolio.routes());

export default portfolios;
