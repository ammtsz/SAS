import { all, call, takeLatest, put, select } from "redux-saga/effects";
import { UserActionsTypes } from "./user.types";

import {
  auth,
  createUserProfileDocumentFirebase,
  getCurrentUserFirebase,
  rsf,
} from "../../firebase/firebase.utils";

import firebase from "firebase/app";

import {
  actionSetAuthError,
  actionSignInSuccess,
  actionSignInFailure,
  actionSignOutSuccess,
  actionSignOutFailure,
  actionSignUpFailure,
  actionSetUserError,
  actionSetUserTheme,
} from "./user.actions";

import { selectPersistence, selectUserDatas } from "./user.selectors";

// UTILS
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocumentFirebase,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(
      actionSignInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      })
    );
    yield getUserTheme() //*** <= realocar

  } catch (error) {
    yield put(actionSignInFailure(error));
  }
}
export function* signInPersistence() {
  const persistence = yield select(selectPersistence);
  yield persistence
    ? auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    : auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
}
export function* getUserDatasFromFirebase(id) {
  try {
    const userSnapshot = yield call(
      rsf.firestore.getDocument,
      `users/${id}`
    );
    return userSnapshot.data();
  } catch (error) {
    yield put(actionSetUserError(error));
    return {}
  }
}

// CALLED
export function* setUserAuth() {
  try {
    const userAuth = yield getCurrentUserFirebase();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(actionSetAuthError(error));
  }
}
export function* signOut() {
  try {
    yield auth.signOut();
    yield put(actionSignOutSuccess());
  } catch (error) {
    yield put(actionSignOutFailure(error));
  }
}
export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield signInPersistence();
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(actionSignInFailure(error));
  }
}
export function* emailSignUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user, { displayName });
  } catch (error) {
    yield put(actionSignUpFailure(error));
  }
}
export function* updateThemeOnDatabase(theme) {
  try {
    const userDatasState = yield select(selectUserDatas);
    if (userDatasState) {
      const userDatas = yield getUserDatasFromFirebase(userDatasState.id)
      yield call(rsf.firestore.updateDocument, `users/${userDatasState.id}`, {
        ...userDatas,
        theme: theme.payload,
      });
    } else {
      localStorage.setItem("triviaTheme", JSON.stringify(theme.payload));
    }
  } catch (error) {
    yield put(actionSetUserError(error));
  }
}
export function* getUserTheme() {
  try {
    const userDatasState = yield select(selectUserDatas);
    let theme = "light";

    if (userDatasState) {
      const userDatas = yield getUserDatasFromFirebase(userDatasState.id)
      if (userDatas.theme) theme = userDatas.theme;
    } else {
      const LS = JSON.parse(localStorage.getItem("triviaTheme"));
      if (LS) theme = LS;
    }
    yield put(actionSetUserTheme(theme));
  } catch (error) {
    yield put(actionSetUserError(error));
  }
}

// CALLS
export function* onSetUserAuth() {
  yield takeLatest(UserActionsTypes.SAGA_SET_USER_AUTH, setUserAuth);
}
export function* onSignOut() {
  yield takeLatest(UserActionsTypes.SAGA_SIGN_OUT, signOut);
}
export function* onEmailSignIn() {
  yield takeLatest(UserActionsTypes.SAGA_EMAIL_SIGN_IN, emailSignIn);
}
export function* onEmailSignUp() {
  yield takeLatest(UserActionsTypes.SAGA_EMAIL_SIGN_UP, emailSignUp);
}
export function* onUpdateThemeOnDatabase() {
  yield takeLatest(
    UserActionsTypes.SAGA_UPDATE_THEME_ON_DATABASE,
    updateThemeOnDatabase
  );
}
export function* onGetUserTheme() {
  yield takeLatest(UserActionsTypes.SAGA_GET_USER_THEME, getUserTheme);
}

export function* userSagas() {
  yield all([
    call(onSetUserAuth),
    call(onSignOut),
    call(onEmailSignIn),
    call(onEmailSignUp),
    call(onUpdateThemeOnDatabase),
    call(onGetUserTheme),
  ]);
}
