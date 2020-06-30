import { combineReducers } from "redux";
import auth, { authSaga } from "./auth";
import loading from "./loading";
import user, { userSaga } from "./user";
import portfolios, { portfoliosSaga } from "./portfolios";
import { all } from "redux-saga/effects";

const rootReducers = combineReducers({
  auth,
  loading,
  user,
  portfolios,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), portfoliosSaga()]);
}

export default rootReducers;
