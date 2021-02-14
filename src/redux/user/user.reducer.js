import { UserActionsTypes } from "./user.types";

const INITIAL_STATE = {
  datas: null,
  persistence: false,
  theme: "light",
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionsTypes.REDUCER_SET_USER:
      return { ...state, datas: action.payload };

    case UserActionsTypes.REDUCER_SET_PERSISTENCE:
      return { ...state, persistence: action.payload };

    case UserActionsTypes.REDUCER_SET_AUTH_ERROR:
    case UserActionsTypes.REDUCER_SIGN_IN_FAILURE:
    case UserActionsTypes.REDUCER_SIGN_OUT_FAILURE:
    case UserActionsTypes.REDUCER_SIGN_UP_FAILURE:
    case UserActionsTypes.REDUCER_SET_USER_ERROR:
      return { ...state, error: action.payload };

    case UserActionsTypes.REDUCER_SIGN_IN_SUCCESS:
      return { ...state, datas: action.payload, error: null };

    case UserActionsTypes.REDUCER_SIGN_OUT_SUCCESS:
      return { ...state, datas: null, error: null };

    case UserActionsTypes.REDUCER_SET_THEME:
      return { ...state, theme: action.payload };

    case UserActionsTypes.REDUCER_RESET_THEME:
      return { ...state, theme: "light" };

    default:
      return state;
  }
};

export default userReducer;
