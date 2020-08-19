import { combineReducers } from "redux";
import auth, { authSaga } from "./auth";
import loading from "./loading";
import user, { userSaga } from "./user";
import portfolios, { portfoliosSaga } from "./portfolios";
import portfolio, { portfolioSaga } from "./portfolio";
import writePortfolio, { allWritePortfolioSaga } from "./writePortfolio";
import design, { designSaga } from "./design";
import writeDesign, { allWriteDesignSaga } from "./writeDesign";
import { all } from "redux-saga/effects";

const rootReducers = combineReducers({
  auth,
  loading,
  user,
  portfolios,
  portfolio,
  writePortfolio,
  design,
  writeDesign,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    portfoliosSaga(),
    portfolioSaga(),
    allWritePortfolioSaga(),
    designSaga(),
    allWriteDesignSaga(),
  ]);
}

export default rootReducers;
