import { UserActionsTypes } from "./user.types";

// REDUCERS
export const actionSetUser = (user) => ({
  type: UserActionsTypes.REDUCER_SET_USER,
  payload: user,
});
export const actionSetAuthError = (data) => ({
  type: UserActionsTypes.REDUCER_SET_AUTH_ERROR,
  payload: data,
});
export const actionSetPersistence = (data) => ({
  type: UserActionsTypes.REDUCER_SET_PERSISTENCE,
  payload: data,
});
export const actionSetUserTheme = (data) => ({
  type: UserActionsTypes.REDUCER_SET_THEME,
  payload: data,
});

export const actionSignInSuccess = (user) => ({
  type: UserActionsTypes.REDUCER_SIGN_IN_SUCCESS,
  payload: user,
});
export const actionSignInFailure = (error) => ({
  type: UserActionsTypes.REDUCER_SIGN_IN_FAILURE,
  payload: error,
});
export const actionSignOutSuccess = () => ({
  type: UserActionsTypes.REDUCER_SIGN_OUT_SUCCESS,
});
export const actionSignOutFailure = (error) => ({
  type: UserActionsTypes.REDUCER_SIGN_OUT_FAILURE,
  payload: error,
});
export const actionSignUpFailure = (error) => ({
  type: UserActionsTypes.REDUCER_SIGN_UP_FAILURE,
  payload: error,
});
export const actionResetUserTheme = () => ({
  type: UserActionsTypes.REDUCER_RESET_THEME,
});
export const actionSetUserError = (error) => ({
  type: UserActionsTypes.REDUCER_SET_USER_ERROR,
  payload: error,
});

// SAGAS
export const actionSetUserAuth = () => ({
  type: UserActionsTypes.SAGA_SET_USER_AUTH,
});
export const actionSignOut = () => ({
  type: UserActionsTypes.SAGA_SIGN_OUT,
});
export const actionEmailSignIn = (datas) => ({
  type: UserActionsTypes.SAGA_EMAIL_SIGN_IN,
  payload: datas,
});
export const actionEmailSignUp = (datas) => ({
  type: UserActionsTypes.SAGA_EMAIL_SIGN_UP,
  payload: datas,
});
export const actionUpdateThemeOnDatabase = (datas) => ({
  type: UserActionsTypes.SAGA_UPDATE_THEME_ON_DATABASE,
  payload: datas,
});
export const actionGetUserTheme = () => ({
  type: UserActionsTypes.SAGA_GET_USER_THEME,
});
