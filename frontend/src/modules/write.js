import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "./../lib/createRequestSaga";
import * as portfoliosAPI from "./../lib/api/portfolios";
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = "write/INITIALIZE";
const CHANGE_FIELD = "write/CHANGE_FIELD";
const [
  WRITE_PORTFOLIO,
  WRITE_PORTFOLIO_SUCCESS,
  WRITE_PORTFOLIO_FAILURE,
] = createRequestActionTypes("write/WRITE_PORTFOLIO");

const [
  WRITE_FILE_UPLOAD,
  WRITE_FILE_UPLOAD_SUCCESS,
  WRITE_FILE_UPLOAD_FAILURE,
] = createRequestActionTypes("write/WRITE_FILE_UPLOAD");

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writePortfolio = createAction(WRITE_PORTFOLIO);

export const writeFileUpload = createAction(WRITE_FILE_UPLOAD);

const writePortfolioSaga = createRequestSaga(
  WRITE_PORTFOLIO,
  portfoliosAPI.writePortFolio
);
const writeFileUploadSaga = createRequestSaga(
  WRITE_FILE_UPLOAD,
  portfoliosAPI.writeFileUpload
);
export function* writeSaga() {
  yield takeLatest(WRITE_PORTFOLIO, writePortfolioSaga);
  yield takeLatest(WRITE_FILE_UPLOAD, writeFileUploadSaga);
}

const initialState = {
  id: "",
  client: "",
  host: "",
  web: false,
  singlePage: false,
  pcVer: false,
  mobileVer: false,
  responsiveWeb: false,
  IEVersion: "",
  skill: [],
  animationEvent: [],
  workYear: "",
  workMonth: "",
  period: "",
  worker: "",
  url: [],
  portfolio: null,
  portfolioError: null,
  fileUplaod: null,
  fileUplaodError: null,
  originalPortfolioId: null,
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
    [WRITE_FILE_UPLOAD]: (state) => ({
      ...state,
      fileUplaod: null,
      fileUplaodError: null,
    }),
    [WRITE_FILE_UPLOAD_SUCCESS]: (state, { payload: fileUplaod }) => ({
      ...state,
      fileUplaod,
    }),
    [WRITE_FILE_UPLOAD_FAILURE]: (state, { payload: fileUplaodError }) => ({
      ...state,
      fileUplaodError,
    }),
  },
  initialState
);
