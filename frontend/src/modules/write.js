import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "./../lib/createRequestSaga";
import * as portfoliosAPI from "./../lib/api/portfolios";
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = "write/INITIALIZE";
const CHANGE_FIELD = "write/CHANGE_FIELD";
const [CHECK_ID, CHECK_ID_SUCCESS, CHECK_ID_FAILURE] = createRequestActionTypes(
  "write/CHECK_ID"
);
const [
  WRITE_PORTFOLIO,
  WRITE_PORTFOLIO_SUCCESS,
  WRITE_PORTFOLIO_FAILURE,
] = createRequestActionTypes("write/WRITE_PORTFOLIO");

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const idCheck = createAction(CHECK_ID);
export const writePortfolio = createAction(WRITE_PORTFOLIO);

const checkIdSaga = createRequestSaga(CHECK_ID, portfoliosAPI.idCheck);
const writePortfolioSaga = createRequestSaga(
  WRITE_PORTFOLIO,
  portfoliosAPI.writePortFolio
);

export function* writeSaga() {
  yield takeLatest(CHECK_ID, checkIdSaga);
  yield takeLatest(WRITE_PORTFOLIO, writePortfolioSaga);
}

const initialState = {
  id: "",
  checkId: null,
  checkIdError: null,
  client: "",
  host: "",
  web: true,
  singlePage: false,
  pcVer: true,
  mobileVer: false,
  responsiveWeb: false,
  IEVersion: "",
  skill: "",
  animationEvent: "",
  workYear: "",
  workMonth: "",
  period: "",
  worker: "",
  url: "",
  portfolio: null,
  portfolioError: null,
};

export default handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_PORTFOLIO]: (state) => ({
      ...state,
      portfolio: null,
      portfolioError: null,
    }),
    [WRITE_PORTFOLIO_SUCCESS]: (state, { payload: portfolio }) => ({
      ...state,
      portfolio,
    }),
    [WRITE_PORTFOLIO_FAILURE]: (state, { payload: portfolioError }) => ({
      ...state,
      portfolioError,
    }),
    [CHECK_ID]: (state) => ({
      ...state,
      checkId: null,
      checkIdError: null,
    }),
    [CHECK_ID_SUCCESS]: (state, { payload: checkId }) => ({
      ...state,
      checkId: checkId,
    }),
    [CHECK_ID_FAILURE]: (state, { payload: checkIdError }) => ({
      ...state,
      checkIdError: checkIdError,
    }),
  },
  initialState
);
