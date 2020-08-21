import Router from "koa-router";
import * as designCtrl from "./design.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

const design = new Router();

design.post("/", checkLoggedIn, designCtrl.write);
design.get("/", designCtrl.list);
design.get("/category", designCtrl.category);
design.get("/countDesign", designCtrl.countDesign);

const designId = new Router();

designId.get("/", designCtrl.read);
designId.delete("/", checkLoggedIn, designCtrl.remove);
designId.patch("/", checkLoggedIn, designCtrl.update);

design.use("/:id", designCtrl.getDesignById, designId.routes());

export default design;
