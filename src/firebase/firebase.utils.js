import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import ReduxSagaFirebase from "redux-saga-firebase";

const config = {
    apiKey: "AIzaSyBMd-MLzwR-Ycna6z2sQRLnVXlGbGX0Oc4",
    authDomain: "tt-sas.firebaseapp.com",
    projectId: "tt-sas",
    storageBucket: "tt-sas.appspot.com",
    messagingSenderId: "807604165266",
    appId: "1:807604165266:web:cf37aa961857add357e44b",
    measurementId: "G-M71MEWXSGB"
};

const firebaseApp = firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const rsf = new ReduxSagaFirebase(firebaseApp);

export const createUserProfileDocumentFirebase = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error trying to create user", error.message);
    }
  }
  return userRef;
};

export const getCurrentUserFirebase = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};


export default firebase;
