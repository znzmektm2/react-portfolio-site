import { combineReducers } from "redux";
import auth, { authSaga } from "./auth";
import loading from "./loading";
import user, { userSaga } from "./user";
import portfolios, { portfoliosSaga } from "./portfolios";
import portfolio, { portfolioSaga } from "./portfolio";
import write, { writeSaga } from "./write";
import { all } from "redux-saga/effects";

const rootReducers = combineReducers({
  auth,
  loading,
  user,
  portfolios,
  portfolio,
  write,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    portfoliosSaga(),
    portfolioSaga(),
    writeSaga(),
  ]);
}

export default rootReducers;
