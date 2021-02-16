import { call, takeLatest, put, select } from "redux-saga/effects";
import { UserActionsTypes } from "./user.types";

import {
  auth,
  createUserProfileDocumentFirebase,
  getCurrentUserFirebase,
  rsf,
} from "../../firebase/firebase.utils";

import {
  actionSetAuthError,
  actionSignInFailure,
  actionSignOutSuccess,
  actionSignOutFailure,
  actionSignUpFailure,
  actionSetUserTheme,
} from "./user.actions";

import {
  getSnapshotFromUserAuth,
  signInPersistence,
  getUserDatasFromFirebase,
  setUserAuth,
  signOut,
  emailSignIn,
  emailSignUp,
  updateThemeOnDatabase,
  getUserTheme,
  onSetUserAuth,
  onSignOut,
  onEmailSignIn,
  onEmailSignUp,
  onUpdateThemeOnDatabase,
  onGetUserTheme,
} from "./user.sagas";

import { selectPersistence, selectUserDatas } from "./user.selectors";

describe("user.sagas", () => {
  describe("calls", () => {
    it("should trigger on SAGA_SET_USER_AUTH 'onSetUserAuth'", () => {
      const gen = onSetUserAuth();
      expect(gen.next().value).toEqual(
        takeLatest(UserActionsTypes.SAGA_SET_USER_AUTH, setUserAuth)
      );
    });

    it("should trigger on SAGA_SIGN_OUT 'onSignOut'", () => {
      const gen = onSignOut();
      expect(gen.next().value).toEqual(
        takeLatest(UserActionsTypes.SAGA_SIGN_OUT, signOut)
      );
    });

    it("should trigger on SAGA_EMAIL_SIGN_IN 'onEmailSignIn'", () => {
      const gen = onEmailSignIn();
      expect(gen.next().value).toEqual(
        takeLatest(UserActionsTypes.SAGA_EMAIL_SIGN_IN, emailSignIn)
      );
    });

    it("should trigger on SAGA_EMAIL_SIGN_UP 'onEmailSignUp'", () => {
      const gen = onEmailSignUp();
      expect(gen.next().value).toEqual(
        takeLatest(UserActionsTypes.SAGA_EMAIL_SIGN_UP, emailSignUp)
      );
    });

    it("should trigger on SAGA_UPDATE_THEME_ON_DATABASE 'onUpdateThemeOnDatabase'", () => {
      const gen = onUpdateThemeOnDatabase();
      expect(gen.next().value).toEqual(
        takeLatest(
          UserActionsTypes.SAGA_UPDATE_THEME_ON_DATABASE,
          updateThemeOnDatabase
        )
      );
    });

    it("should trigger on SAGA_GET_USER_THEME 'onGetUserTheme'", () => {
      const gen = onGetUserTheme();
      expect(gen.next().value).toEqual(
        takeLatest(UserActionsTypes.SAGA_GET_USER_THEME, getUserTheme)
      );
    });
  });

  // CALLED
  describe("'setUserAuth'", () => {
    const gen = setUserAuth();

    it("should call 'getCurrentUserFirebase'", () => {
      expect(gen.next().value).toEqual(getCurrentUserFirebase());
    });

    it("should call getSnapshotFromUserAuth if userAuth exists", () => {
      const mockUserAuth = { uid: "123" };
      expect(gen.next(mockUserAuth).value).toEqual(
        getSnapshotFromUserAuth(mockUserAuth)
      );
    });

    it("should call 'actionSetAuthError' on error", () => {
      const newGen = setUserAuth();
      newGen.next();
      expect(newGen.throw("error").value).toEqual(
        put(actionSetAuthError("error"))
      );
    });
  });

  describe("signOut", () => {
    const gen = signOut();

    it("should call auth.signOut", () => {
      const expectSignOut = jest.spyOn(auth, "signOut");
      gen.next();
      expect(expectSignOut).toHaveBeenCalledTimes(1);
    });

    it("should call 'actionSignOutSuccess'", () => {
      expect(gen.next().value).toEqual(put(actionSignOutSuccess()));
    });

    it("should call 'actionSignOutFailure' on error", () => {
      const newGen = signOut();
      newGen.next();
      expect(newGen.throw("error").value).toEqual(
        put(actionSignOutFailure("error"))
      );
    });
  });

  describe("emailSignIn", () => {
    const mockEmail = "email@email.com";
    const mockPassword = "123";

    const mockAction = {
      payload: {
        email: mockEmail,
        password: mockPassword,
      },
    };

    const gen = emailSignIn(mockAction);
    it("should call 'auth.signInWithEmailAndPassword'", () => {
      const signInWithEmailAndPassword = jest.spyOn(
        auth,
        "signInWithEmailAndPassword"
      );
      gen.next();
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });

    it("should call 'actionSignUpFailure' on error", () => {
      const newGen = emailSignIn(mockAction);
      newGen.next();
      expect(newGen.throw("error").value).toEqual(
        put(actionSignInFailure("error"))
      );
    });
  });

  describe("emailSignUp", () => {
    const mockEmail = "email@email.com";
    const mockPassword = "123";
    const mockDisplayName = "user";

    const mockAction = {
      payload: {
        email: mockEmail,
        password: mockPassword,
        displayName: mockDisplayName,
      },
    };

    it("should call auth.createUserWithEmailAndPassword", () => {
      const gen = emailSignUp(mockAction);
      const createUserWithEmailAndPassword = jest.spyOn(
        auth,
        "createUserWithEmailAndPassword"
      );
      gen.next();
      expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });

    it("should call 'actionSignUpFailure' on error", () => {
      const newGen = emailSignUp(mockAction);
      newGen.next();
      expect(newGen.throw("error").value).toEqual(
        put(actionSignUpFailure("error"))
      );
    });
  });

  describe("'updateThemeOnDatabase'", () => {
    const mockTheme = "light";
    const gen = updateThemeOnDatabase(mockTheme);

    it("should get 'selectUserDatas'", () => {
      expect(gen.next().value).toEqual(select(selectUserDatas));
    });

    it("should get userDatas from firebase if userData !== null", () => {
      const mockUserDatasState = { id: 123 };

      expect(gen.next(mockUserDatasState).value).toEqual(
        getUserDatasFromFirebase(mockUserDatasState.id)
      );
    });
  });

  describe("'getUserTheme'", () => {
    const gen = getUserTheme();

    it("should get 'selectUserDatas'", () => {
      expect(gen.next().value).toEqual(select(selectUserDatas));
    });

    it("should get userDatas from firebase if userData !== null", () => {
      const mockUserDatasState = { id: 123 };

      expect(gen.next(mockUserDatasState).value).toEqual(
        getUserDatasFromFirebase(mockUserDatasState.id)
      );
    });

    it("should call 'actionSetUserTheme'", () => {
      const mockTheme = { id: 123, theme: "light" };

      expect(gen.next(mockTheme).value).toEqual(
        put(actionSetUserTheme(mockTheme.theme))
      );
    });
  });

  // UTILS
  describe("getSnapshotFromUserAuth", () => {
    const mockUserAuth = {};
    const mockAdditionalData = {};
    const gen = getSnapshotFromUserAuth(mockUserAuth, mockAdditionalData);

    expect(gen.next().value).toEqual(
      call(createUserProfileDocumentFirebase, mockUserAuth, mockAdditionalData)
    );
  });

  describe("'signInPersistence'", () => {
    const gen = signInPersistence();

    it("should get 'selectPersistence'", () => {
      expect(gen.next().value).toEqual(select(selectPersistence));
    });
  });

  describe("'getUserDatasFromFirebase'", () => {
    const mockId = "123";
    const gen = getUserDatasFromFirebase(mockId);

    it("should get datas from firebase", () => {
      expect(gen.next(mockId).value).toEqual(
        call(rsf.firestore.getDocument, `users/${mockId}`)
      );
    });
  });
});
