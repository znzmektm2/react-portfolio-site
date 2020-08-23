import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "./../lib/createRequestSaga";
import * as portfoliosAPI from "./../lib/api/portfolios";
import { takeLatest } from "redux-saga/effects";

const INITIALIZEWRITE = "writePortfolio/INITIALIZEWRITE";
const CHANGE_FIELD = "writePortfolio/CHANGE_FIELD";
const [CHECK_ID, CHECK_ID_SUCCESS, CHECK_ID_FAILURE] = createRequestActionTypes(
  "writePortfolio/CHECK_ID"
);
const [
  WRITE_PORTFOLIO,
  WRITE_PORTFOLIO_SUCCESS,
  WRITE_PORTFOLIO_FAILURE,
] = createRequestActionTypes("writePortfolio/WRITE_PORTFOLIO");
const SET_ORIGINAL_PORTFOLIO = "writePortfolio/SET_ORIGINAL_PORTFOLIO";
const [
  UPDATE_PORTFOLIO,
  UPDATE_PORTFOLIO_SUCCESS,
  UPDATE_PORTFOLIO_FAILURE,
] = createRequestActionTypes("writePortfolio/UPDATE_PORTFOLIO");

export const initializeWrite = createAction(INITIALIZEWRITE);
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

export function* allWritePortfolioSaga() {
  yield takeLatest(CHECK_ID, checkIdSaga);
  yield takeLatest(WRITE_PORTFOLIO, writePortfolioSaga);
  yield takeLatest(UPDATE_PORTFOLIO, updatePortfolioSaga);
}

const initialState = {
  id: "",
  hasId: null,
  hasIdError: null,
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
  clientImage: null,
  contentImage: null,
  portfolio: null,
  portfolioError: null,
  originalPortfolioId: null,
};

export default handleActions(
  {
    [INITIALIZEWRITE]: (state) => initialState,
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
      portfolioError,
    }),
    [CHECK_ID]: (state) => ({
      ...state,
      hasId: null,
      hasIdError: null,
    }),
    [CHECK_ID_SUCCESS]: (state, { payload: hasId }) => ({
      ...state,
      hasId,
      hasIdError: null,
    }),
    [CHECK_ID_FAILURE]: (state, { payload: hasIdError }) => ({
      ...state,
      hasId: null,
      hasIdError,
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
      clientImage: portfolio.clientImage,
      contentImage: portfolio.contentImage,
      originalPortfolioId: portfolio.id,
    }),
    [UPDATE_PORTFOLIO_SUCCESS]: (state, { payload: portfolio }) => ({
      ...state,
      portfolio,
      portfolioError: null,
    }),
    [UPDATE_PORTFOLIO_FAILURE]: (state, { payload: portfolioError }) => ({
      ...state,
      portfolioError,
    }),
  },
  initialState
);
