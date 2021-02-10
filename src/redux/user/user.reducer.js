import { UserActionsTypes } from "./user.types";

const INITIAL_STATE = {
  credentials: null,
  persistence: false,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionsTypes.REDUCER_SET_USER:
      return { ...state, credentials: action.payload };

    case UserActionsTypes.REDUCER_SET_PERSISTENCE:
      return { ...state, persistence: action.payload };

    case UserActionsTypes.REDUCER_SET_AUTH_ERROR:
    case UserActionsTypes.REDUCER_SIGN_IN_FAILURE:
    case UserActionsTypes.REDUCER_SIGN_OUT_FAILURE:
    case UserActionsTypes.REDUCER_SIGN_UP_FAILURE:
      return { ...state, error: action.payload };

    case UserActionsTypes.REDUCER_SIGN_IN_SUCCESS:
      return { ...state, credentials: action.payload, error: null };

    case UserActionsTypes.REDUCER_SIGN_OUT_SUCCESS:
      return { ...state, credentials: null, error: null };

    default:
      return state;
  }
};

export default userReducer;
