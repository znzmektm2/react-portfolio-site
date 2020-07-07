import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "./../lib/createRequestSaga";
import * as portfoliosAPI from "./../lib/api/portfolios";
import { takeLatest } from "redux-saga/effects";

const [
  READ_PORTFOLIO,
  READ_PORTFOLIO_SUCCESS,
  READ_PORTFOLIO_FAILURE,
] = createRequestActionTypes("portfolio/READ_PORTFOLIO");
const UNLOAD_PORTFOLIO = "portfolio/UNLOAD_PORTFOLIO";

export const readportfolio = createAction(READ_PORTFOLIO, (id) => id);
export const unloadPortfolio = createAction(UNLOAD_PORTFOLIO);

const readPortfolioSaga = createRequestSaga(
  READ_PORTFOLIO,
  portfoliosAPI.readPortFolio
);
export function* portfolioSaga() {
  yield takeLatest(READ_PORTFOLIO, readPortfolioSaga);
}

const initailState = {
  portfolio: null,
  error: null,
};

export default handleActions(
  {
    [READ_PORTFOLIO_SUCCESS]: (state, { payload: portfolio }) => ({
      ...state,
      portfolio,
    }),
    [READ_PORTFOLIO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_PORTFOLIO]: (state) => initailState,
  },
  initailState
);
