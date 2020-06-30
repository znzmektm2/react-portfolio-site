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
  PORTFOLIOS,
  PORTFOLIOS_SUCCESS,
  PORTFOLIOS_FAILURE,
] = createRequestActionTypes("portfolios/PORTFOLIOS");

export const category = createAction(CATEGORY);
export const portfolios = createAction(
  PORTFOLIOS,
  ({ skill, web, singlePage }) => ({
    skill,
    web,
    singlePage,
  })
);

const categorySaga = createRequestSaga(CATEGORY, portfoliosAPI.category);
const listSaga = createRequestSaga(PORTFOLIOS, portfoliosAPI.list);

export function* portfoliosSaga() {
  yield takeLatest(CATEGORY, categorySaga);
  yield takeLatest(PORTFOLIOS, listSaga);
}

const initialState = {
  category: null,
  categoryError: null,
  portfolios: null,
  portfoliosError: null,
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
    [PORTFOLIOS_SUCCESS]: (state, { payload: portfolios, meta: response }) => ({
      ...state,
      portfoliosError: null,
      portfolios,
      lastPage: parseInt(response.headers["last-page"], 10),
    }),
    [PORTFOLIOS_FAILURE]: (state, { payload: portfoliosError }) => ({
      ...state,
      portfoliosError,
    }),
  },
  initialState
);
