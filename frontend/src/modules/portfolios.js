import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "./../lib/createRequestSaga";
import * as portfoliosAPI from "./../lib/api/portfolios";

const [CATEGORY, CATEGORY_SUCCESS, CATEGORY_FAILURE] = createRequestActionTypes(
  "portfolios/CATEGORY"
);
const [
  COUNTPORTFOLIO,
  COUNTPORTFOLIO_SUCCESS,
  COUNTPORTFOLIO_FAILURE,
] = createRequestActionTypes("portfolios/COUNTPORTFOLIO");
const [CLIENTS, CLIENTS_SUCCESS, CLIENTS_FAILURE] = createRequestActionTypes(
  "portfolios/CLIENTS"
);
const [
  PORTFOLIOS,
  PORTFOLIOS_SUCCESS,
  PORTFOLIOS_FAILURE,
] = createRequestActionTypes("portfolios/PORTFOLIOS");
const INITIALIZE_PORTFOLOIOS = "portfolios/INITIALIZE_PORTFOLOIOS";
const CURRENT_PAGE = "portfolios/CURRENT_PAGE";

export const category = createAction(CATEGORY);
export const countPortfolio = createAction(COUNTPORTFOLIO);
export const clients = createAction(CLIENTS);
export const portfolios = createAction(
  PORTFOLIOS,
  ({ skill, web, singlePage, page }) => ({
    skill,
    web,
    singlePage,
    page,
  })
);
export const initializePortfolios = createAction(INITIALIZE_PORTFOLOIOS);
export const currentPage = createAction(
  CURRENT_PAGE,
  (currentPage) => currentPage
);

const categorySaga = createRequestSaga(CATEGORY, portfoliosAPI.category);
const countPortfolioSaga = createRequestSaga(
  COUNTPORTFOLIO,
  portfoliosAPI.countPortfolio
);
const clientsSaga = createRequestSaga(CLIENTS, portfoliosAPI.clients);
const listSaga = createRequestSaga(PORTFOLIOS, portfoliosAPI.list);

export function* portfoliosSaga() {
  yield takeLatest(CATEGORY, categorySaga);
  yield takeLatest(COUNTPORTFOLIO, countPortfolioSaga);
  yield takeLatest(CLIENTS, clientsSaga);
  yield takeLatest(PORTFOLIOS, listSaga);
}

const initialState = {
  category: null,
  categoryError: null,
  countPortfolio: null,
  countPortfolioError: null,
  clients: null,
  clientsError: null,
  portfolios: [],
  portfoliosError: null,
  currentPage: 1,
  lastPage: 1,
};

export default handleActions(
  {
    [CATEGORY_SUCCESS]: (state, { payload: category }) => ({
      ...state,
      categoryError: null,
      category,
    }),
    [CATEGORY_FAILURE]: (state, { payload: categoryError }) => ({
      ...state,
      categoryError,
    }),
    [COUNTPORTFOLIO_SUCCESS]: (state, { payload: countPortfolio }) => ({
      ...state,
      countPortfolioError: null,
      countPortfolio,
    }),
    [COUNTPORTFOLIO_FAILURE]: (state, { payload: countPortfolioError }) => ({
      ...state,
      countPortfolioError,
    }),
    [CLIENTS_SUCCESS]: (state, { payload: clients }) => ({
      ...state,
      clientsError: null,
      clients,
    }),
    [CLIENTS_FAILURE]: (state, { payload: clientsError }) => ({
      ...state,
      clientsError,
    }),
    [PORTFOLIOS_SUCCESS]: (state, { payload: portfolio, meta: response }) => ({
      ...state,
      portfoliosError: null,
      portfolios: state.portfolios
        .concat(portfolio)
        .reduce(
          (acc, cur) => [...acc.filter((obj) => obj.id !== cur.id), cur],
          []
        ),
      lastPage: parseInt(response.headers["last-page"], 10),
    }),
    [PORTFOLIOS_FAILURE]: (state, { payload: portfoliosError }) => ({
      ...state,
      portfoliosError,
    }),
    [INITIALIZE_PORTFOLOIOS]: (state) => ({
      ...state,
      portfolios: [],
      portfoliosError: null,
      currentPage: 1,
      lastPage: 1,
    }),
    [CURRENT_PAGE]: (state, { payload: currentPage }) => ({
      ...state,
      currentPage,
    }),
  },
  initialState
);
