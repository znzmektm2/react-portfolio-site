import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "./../lib/createRequestSaga";
import * as authAPI from "../lib/api/auth";
import { takeLatest } from "redux-saga/effects";

const CHANGE_FIELD = "auth/CAHGNE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  "auth/LOGIN"
);

export const changeField = createAction(CHANGE_FIELD, (password) => password);
export const initializeForm = createAction(INITIALIZE_FORM);
export const login = createAction(LOGIN, (password) => password);

const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  password: "",
  auth: null,
  authError: null,
};

export default handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: password }) => ({
      ...state,
      password,
    }),
    [INITIALIZE_FORM]: (state) => ({
      ...state,
      password: initialState.password,
      authError: null,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState
);
