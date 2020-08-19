import Router from "koa-router";
import auth from "./auth";
import portfolios from "./portfolios";
import design from "./design";

const api = new Router();

api.use("/auth", auth.routes());
api.use("/portfolios", portfolios.routes());
api.use("/design", design.routes());

export default api;
