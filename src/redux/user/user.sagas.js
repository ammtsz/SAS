import { all, call, takeLatest, put, select } from "redux-saga/effects";
import { UserActionsTypes } from "./user.types";
import {
  auth,
  createUserProfileDocumentFirebase,
  getCurrentUserFirebase,
} from "../../firebase/firebase.utils";
import firebase from "firebase/app";
import {
  actionSetAuthError,
  actionSignInSuccess,
  actionSignInFailure,
  actionSignOutSuccess,
  actionSignOutFailure,
  actionSignUpFailure,
} from "./user.actions";
import { selectPersistence } from "./user.selectors";

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
  } catch (error) {
    yield put(actionSignInFailure(error));
  }
}
export function* signInPersistence() {
  const persistence = yield select(selectPersistence);
  persistence
    ? auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    : auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

// ACTIONS
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
    yield getSnapshotFromUserAuth(user, {displayName})
  } catch (error) {
    yield put(actionSignUpFailure(error));
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

export function* userSagas() {
  yield all([
    call(onSetUserAuth),
    call(onSignOut),
    call(onEmailSignIn),
    call(onEmailSignUp),
  ]);
}
