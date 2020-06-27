import { createAction, handleActions } from "redux-actions";
import { crrateRequestActionTypes } from "./../lib/createRequestSaga";

const CHANGE_FIELD = "auth/CAHGNE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = crrateRequestActionTypes(
  "auth/LOGIN"
);

export const changeField = createAction(CHANGE_FIELD, (password) => password);
export const initializeForm = createAction(INITIALIZE_FORM);
export const login = createAction(LOGIN, (password) => password);

const initialState = {
  password: "",
  auth: null,
  authError: null,
};

const auth = handleActions(
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

export default auth;
