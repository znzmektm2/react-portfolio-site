import Router from "koa-router";
import auth from "./auth";
import portfolios from "./portfolios";

const api = new Router();

api.use("/auth", auth.routes());
api.use("/portfolios", portfolios.routes());

export default api;
