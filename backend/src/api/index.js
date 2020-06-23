import Router from "koa-router";
import auth from "./auth";
import portfolio from "./portfolio";
import category from "./category";

const api = new Router();

api.use("/auth", auth.routes());
api.use("/portfolio", portfolio.routes());
api.use("/category", category.routes());

export default api;
