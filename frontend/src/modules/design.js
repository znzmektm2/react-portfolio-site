import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "./../lib/createRequestSaga";
import * as designAPI from "./../lib/api/design";

const [CATEGORY, CATEGORY_SUCCESS, CATEGORY_FAILURE] = createRequestActionTypes(
  "design/CATEGORY"
);
const [
  COUNTDESIGN,
  COUNTDESIGN_SUCCESS,
  COUNTDESIGN_FAILURE,
] = createRequestActionTypes("design/COUNTDESIGN");
const [DESIGN, DESIGN_SUCCESS, DESIGN_FAILURE] = createRequestActionTypes(
  "design/DESIGN"
);
const INITIALIZE_DESIGN = "design/INITIALIZE_DESIGN";
const CURRENT_PAGE = "design/CURRENT_PAGE";

export const category = createAction(CATEGORY);
export const countDesign = createAction(COUNTDESIGN);
export const design = createAction(DESIGN, (category) => category);
export const initializeDesign = createAction(INITIALIZE_DESIGN);
export const currentPage = createAction(
  CURRENT_PAGE,
  (currentPage) => currentPage
);

const categorySaga = createRequestSaga(CATEGORY, designAPI.category);
const countDesignSaga = createRequestSaga(COUNTDESIGN, designAPI.countDesign);
const listSaga = createRequestSaga(DESIGN, designAPI.list);

export function* designSaga() {
  yield takeLatest(CATEGORY, categorySaga);
  yield takeLatest(COUNTDESIGN, countDesignSaga);
  yield takeLatest(DESIGN, listSaga);
}

const initialState = {
  category: null,
  categoryError: null,
  countDesign: null,
  countDesignError: null,
  design: [],
  designError: null,
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
    [CATEGORY_FAILURE]: (state, { payload: designError }) => ({
      ...state,
      designError,
    }),
    [COUNTDESIGN_SUCCESS]: (state, { payload: countDesign }) => ({
      ...state,
      countDesignError: null,
      countDesign,
    }),
    [COUNTDESIGN_FAILURE]: (state, { payload: countDesignError }) => ({
      ...state,
      countDesignError,
    }),
    [DESIGN_SUCCESS]: (state, { payload: designList, meta: response }) => ({
      ...state,
      designError: null,
      design: state.design
        .concat(designList)
        .reduce(
          (acc, cur) => [...acc.filter((obj) => obj._id !== cur._id), cur],
          []
        ),
      lastPage: parseInt(response.headers["last-page"], 10),
    }),
    [DESIGN_FAILURE]: (state, { payload: designError }) => ({
      ...state,
      designError,
    }),
    [INITIALIZE_DESIGN]: (state) => ({
      ...state,
      design: [],
      designError: null,
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
