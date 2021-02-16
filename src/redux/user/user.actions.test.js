import { UserActionsTypes } from "./user.types";

import {
  actionSetUser,
  actionSetAuthError,
  actionSetPersistence,
  actionSetUserTheme,
  actionSignInSuccess,
  actionSignInFailure,
  actionSignOutSuccess,
  actionSignOutFailure,
  actionSignUpFailure,
  actionResetUserTheme,
  actionSetUserError,
  actionSetUserAuth,
  actionSignOut,
  actionEmailSignIn,
  actionEmailSignUp,
  actionUpdateThemeOnDatabase,
  actionGetUserTheme,
} from "./user.actions";

describe("report.actions", () => {
  describe("reducers actions", () => {
    it("should create the 'actionSetUser' action", () => {
      const mockUser = { id: "12345", displayName: "user name" };

      const action = actionSetUser(mockUser);

      expect(action.type).toEqual(UserActionsTypes.REDUCER_SET_USER);
      expect(action.payload).toEqual(mockUser);
    });

    it("should create the 'actionSetAuthError' action", () => {
      const mockError = "erro";

      const action = actionSetAuthError(mockError);

      expect(action.type).toEqual(UserActionsTypes.REDUCER_SET_AUTH_ERROR);
      expect(action.payload).toEqual(mockError);
    });

    it("should create the 'actionSetPersistence' action", () => {
      const mockPersistence = true;

      const action = actionSetPersistence(mockPersistence);

      expect(action.type).toEqual(UserActionsTypes.REDUCER_SET_PERSISTENCE);
      expect(action.payload).toEqual(mockPersistence);
    });

    it("should create the 'actionSetUserTheme' action", () => {
      const mockTheme = "dark";

      const action = actionSetUserTheme(mockTheme);

      expect(action.type).toEqual(UserActionsTypes.REDUCER_SET_THEME);
      expect(action.payload).toEqual(mockTheme);
    });

    it("should create the 'actionSignInSuccess' action", () => {
      const mockUser = { id: "12345", displayName: "user name" };

      const action = actionSignInSuccess(mockUser);

      expect(action.type).toEqual(UserActionsTypes.REDUCER_SIGN_IN_SUCCESS);
      expect(action.payload).toEqual(mockUser);
    });

    it("should create the 'actionSignInFailure' action", () => {
      const mockError = "error";

      const action = actionSignInFailure(mockError);

      expect(action.type).toEqual(UserActionsTypes.REDUCER_SIGN_IN_FAILURE);
      expect(action.payload).toEqual(mockError);
    });

    it("should create the 'actionSignOutSuccess' action", () => {
      expect(actionSignOutSuccess().type).toEqual(
        UserActionsTypes.REDUCER_SIGN_OUT_SUCCESS
      );
    });

    it("should create the 'actionSignOutFailure' action", () => {
      const mockError = "error";

      const action = actionSignOutFailure(mockError);

      expect(action.type).toEqual(UserActionsTypes.REDUCER_SIGN_OUT_FAILURE);
      expect(action.payload).toEqual(mockError);
    });

    it("should create the 'actionSignUpFailure' action", () => {
      const mockError = "error";

      const action = actionSignUpFailure(mockError);

      expect(action.type).toEqual(UserActionsTypes.REDUCER_SIGN_UP_FAILURE);
      expect(action.payload).toEqual(mockError);
    });

    it("should create the 'actionResetUserTheme' action", () => {
      expect(actionResetUserTheme().type).toEqual(
        UserActionsTypes.REDUCER_RESET_THEME
      );
    });

    it("should create the 'actionSetUserError' action", () => {
      const mockError = "error";

      const action = actionSetUserError(mockError);

      expect(action.type).toEqual(UserActionsTypes.REDUCER_SET_USER_ERROR);
      expect(action.payload).toEqual(mockError);
    });
  });

  describe("sagas actions", () => {
    it("should create the 'actionSetUserAuth' action", () => {
      expect(actionSetUserAuth().type).toEqual(
        UserActionsTypes.SAGA_SET_USER_AUTH
      );
    });

    it("should create the 'actionSignOut' action", () => {
      expect(actionSignOut().type).toEqual(UserActionsTypes.SAGA_SIGN_OUT);
    });

    it("should create the 'actionEmailSignIn' action", () => {
      const mockUser = { email: "email@email.com", senha: "12345" };

      const action = actionEmailSignIn(mockUser);

      expect(action.type).toEqual(UserActionsTypes.SAGA_EMAIL_SIGN_IN);
      expect(action.payload).toEqual(mockUser);
    });

    it("should create the 'actionEmailSignUp' action", () => {
      const mockUser = {
        email: "email@email.com",
        senha: "12345",
        displayName: "user name",
      };

      const action = actionEmailSignUp(mockUser);

      expect(action.type).toEqual(UserActionsTypes.SAGA_EMAIL_SIGN_UP);
      expect(action.payload).toEqual(mockUser);
    });

    it("should create the 'actionUpdateThemeOnDatabase' action", () => {
      const mockTheme = "light";

      const action = actionUpdateThemeOnDatabase(mockTheme);

      expect(action.type).toEqual(
        UserActionsTypes.SAGA_UPDATE_THEME_ON_DATABASE
      );
      expect(action.payload).toEqual(mockTheme);
    });

    it("should create the 'actionGetUserTheme' action", () => {
      expect(actionGetUserTheme().type).toEqual(
        UserActionsTypes.SAGA_GET_USER_THEME
      );
    });
  });
});
