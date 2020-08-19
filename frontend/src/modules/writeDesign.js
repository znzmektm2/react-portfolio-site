import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "./../lib/createRequestSaga";
import * as designAPI from "./../lib/api/design";
import { takeLatest } from "redux-saga/effects";

const INITIALIZEWRITE = "writeDesign/INITIALIZEWRITE";
const CHANGE_FIELD = "writeDesign/CHANGE_FIELD";
const [
  WRITE_DESIGN,
  WRITE_DESIGN_SUCCESS,
  WRITE_DESIGN_FAILURE,
] = createRequestActionTypes("writeDesign/WRITE_DESIGN");
const SET_ORIGINAL_DESIGN = "writeDesign/SET_ORIGINAL_DESIGN";
const [
  UPDATE_DESIGN,
  UPDATE_DESIGN_SUCCESS,
  UPDATE_DESIGN_FAILURE,
] = createRequestActionTypes("writeDesign/UPDATE_DESIGN");

export const initializeWrite = createAction(INITIALIZEWRITE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writeDesign = createAction(WRITE_DESIGN);
export const setOriginalDesign = createAction(
  SET_ORIGINAL_DESIGN,
  (design) => design
);
export const updateDesign = createAction(UPDATE_DESIGN);

const writeDesignSaga = createRequestSaga(WRITE_DESIGN, designAPI.writeDesign);
const updateDesignSaga = createRequestSaga(
  UPDATE_DESIGN,
  designAPI.updateDesign
);

export function* allWriteDesignSaga() {
  yield takeLatest(WRITE_DESIGN, writeDesignSaga);
  yield takeLatest(UPDATE_DESIGN, updateDesignSaga);
}

const initialState = {
  id: null,
  name: "",
  category: "",
  designImage: null,
  design: null,
  designError: null,
};

export default handleActions(
  {
    [INITIALIZEWRITE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_DESIGN_SUCCESS]: (state, { payload: design }) => ({
      ...state,
      design,
      designError: null,
    }),
    [WRITE_DESIGN_FAILURE]: (state, { payload: designError }) => ({
      ...state,
      designError,
    }),
    [SET_ORIGINAL_DESIGN]: (state, { payload: design }) => ({
      ...state,
      id: design._id,
      name: design.name,
      category: design.category,
      designImage: design.designImage,
    }),
    [UPDATE_DESIGN_SUCCESS]: (state, { payload: design }) => ({
      ...state,
      design,
      designError: null,
    }),
    [UPDATE_DESIGN_FAILURE]: (state, { payload: designError }) => ({
      ...state,
      designError,
    }),
  },
  initialState
);
