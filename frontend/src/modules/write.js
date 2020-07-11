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
const SET_ORIGINAL_PORTFOLIO = "write/SET_ORIGINAL_PORTFOLIO";
const [
  UPDATE_PORTFOLIO,
  UPDATE_PORTFOLIO_SUCCESS,
  UPDATE_PORTFOLIO_FAILURE,
] = createRequestActionTypes("write/UPDATE_PORTFOLIO");

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const checkId = createAction(CHECK_ID);
export const writePortfolio = createAction(WRITE_PORTFOLIO);
export const setOriginalPortfolio = createAction(
  SET_ORIGINAL_PORTFOLIO,
  (portfolio) => portfolio
);
export const updatePortfolio = createAction(UPDATE_PORTFOLIO);

const checkIdSaga = createRequestSaga(CHECK_ID, portfoliosAPI.checkId);
const writePortfolioSaga = createRequestSaga(
  WRITE_PORTFOLIO,
  portfoliosAPI.writePortFolio
);
const updatePortfolioSaga = createRequestSaga(
  UPDATE_PORTFOLIO,
  portfoliosAPI.updatePortFolio
);

export function* writeSaga() {
  yield takeLatest(CHECK_ID, checkIdSaga);
  yield takeLatest(WRITE_PORTFOLIO, writePortfolioSaga);
  yield takeLatest(UPDATE_PORTFOLIO, updatePortfolioSaga);
}

const initialState = {
  id: "",
  haveId: null,
  haveIdError: null,
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
  thumbImage: null,
  contentImage: null,
  portfolio: null,
  portfolioError: null,
  originalPortfolioId: null,
};

export default handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_PORTFOLIO_SUCCESS]: (state, { payload: portfolio }) => ({
      ...state,
      portfolio,
      portfolioError: null,
    }),
    [WRITE_PORTFOLIO_FAILURE]: (state, { payload: portfolioError }) => ({
      ...state,
      portfolio: null,
      portfolioError,
    }),
    [CHECK_ID]: (state) => ({
      ...state,
      haveId: null,
      haveIdError: null,
    }),
    [CHECK_ID_SUCCESS]: (state, { payload: haveId }) => ({
      ...state,
      haveId,
      haveIdError: null,
    }),
    [CHECK_ID_FAILURE]: (state, { payload: haveIdError }) => ({
      ...state,
      haveId: null,
      haveIdError,
    }),
    [SET_ORIGINAL_PORTFOLIO]: (state, { payload: portfolio }) => ({
      ...state,
      id: portfolio.id,
      client: portfolio.client,
      host: portfolio.host,
      web: portfolio.web,
      singlePage: portfolio.singlePage,
      pcVer: portfolio.pcVer,
      mobileVer: portfolio.mobileVer,
      responsiveWeb: portfolio.responsiveWeb,
      IEVersion: portfolio.IEVersion,
      skill: portfolio.skill,
      animationEvent: portfolio.animationEvent,
      workYear: portfolio.workYear,
      workMonth: portfolio.workMonth,
      period: portfolio.period,
      worker: portfolio.worker,
      url: portfolio.url,
      thumbImage: portfolio.thumbImage,
      contentImage: portfolio.contentImage,
      originalPortfolioId: portfolio.id,
    }),
    [UPDATE_PORTFOLIO]: (state) => ({
      ...state,
      portfolio: null,
      portfolioError: null,
    }),
    [UPDATE_PORTFOLIO_SUCCESS]: (state, { payload: portfolio }) => ({
      ...state,
      portfolio,
      portfolioError: null,
    }),
    [UPDATE_PORTFOLIO_FAILURE]: (state, { payload: portfolioError }) => ({
      ...state,
      portfolio: null,
      portfolioError,
    }),
  },
  initialState
);
