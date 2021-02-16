import { all, call, takeLatest, put, select } from "redux-saga/effects";

import { fetchCategories } from "../../api/trivia";
import { rsf } from "../../firebase/firebase.utils";

import { CategoriesActionsTypes } from "./categories.types";
import {
  actionSetAllCategories,
  actionSetCategoriesError,
  actionSetCategoriesReport,
} from "./categories.actions";

import { selectReports, selectAllCategories } from "./categories.selectors";
import { selectUserDatas } from "../user/user.selectors";

// UTILS
export function* setCategoriesProgressStatus(categoriesFetched) {
  try {
    const reports = yield select(selectReports);
    const completedCategoriesId = reports ? Object.keys(reports) : [];
    const categoryWithStatus = [];

    categoriesFetched.forEach((category) => {
      let completed = 0;
      if (completedCategoriesId.indexOf(category.id.toString()) > -1) {
        completed = reports[category.id].questions_datas.length;
      }
      categoryWithStatus.push({
        ...category,
        completed,
      });
    });
    yield saveCategories(categoryWithStatus);
  } catch (error) {
    yield put(actionSetCategoriesError(error));
  }
}
export function* saveCategories(categoriesUpdated) {
  try {
    yield put(actionSetAllCategories(categoriesUpdated));
  } catch (error) {
    yield put(actionSetCategoriesError(error));
  }
}
export function* getReportsFromDatabase() {
  try {
    const userDatas = yield select(selectUserDatas);
    let reports
    
    if (userDatas) {
      const userSnapshot = yield call(
        rsf.firestore.getDocument,
        `users/${userDatas.id}`
      );
      reports = userSnapshot.data().reports
    } else {
      reports = localStorage.getItem("trivia") ? JSON.parse(localStorage.getItem("trivia")) : {}
    }
    yield put(actionSetCategoriesReport(reports));
  } catch (error) {
    yield put(actionSetCategoriesError(error));
  }
}

// CALLED
export function* getCategories() {
  try {
    yield getReportsFromDatabase();
    const stateCategories = yield select(selectAllCategories);
    let categories;

    if (stateCategories.length === 0) {
      categories = yield fetchCategories();
      categories = categories.map((category) => ({
        ...category,
        name: category.name.replace("Entertainment: ", ""),
      }));
      categories = categories.map((category) => ({
        ...category,
        name: category.name.replace("Science: ", ""),
      }));
    } else {
      categories = stateCategories;
    }

    yield setCategoriesProgressStatus(categories);
  } catch (error) {
    yield put(actionSetCategoriesError(error));
  }
}


// CALLS

export function* onGetCategories() {
  yield takeLatest(CategoriesActionsTypes.SAGA_GET_CATEGORIES, getCategories);
}

export function* categoriesSagas() {
  yield all([call(onGetCategories)]);
}
