import { all, call, takeLatest, put, select } from "redux-saga/effects";
import { fetchCategories } from "../../api/trivia";

import { CategoriesActionsTypes } from "./categories.types";

import {
  actionSetAllCategories,
  actionSetCategoriesError,
} from "./categories.actions";
import { selectReports, selectAllCategories } from "./categories.selectors";

// UTILS
export function* setEnabledCategories(categoriesFetched) {
  try {
    const reports = yield select(selectReports);
    const completedCategoriesId = reports ? Object.keys(reports) : []; //retorna [categoryId, categoryId]
    const categoryWithStatus = [];

    categoriesFetched.forEach((category) => {
      let completed = 0;
      if (completedCategoriesId.indexOf(category.id.toString()) > -1) {
        completed = reports[category.id].question_datas.length;
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
    localStorage.setItem("categories", JSON.stringify(categoriesUpdated));
  } catch (error) {
    yield put(actionSetCategoriesError(error));
  }
}

// ---------------------------------------------------

export function* getCategories() {
  try {
    const stateCategories = yield select(selectAllCategories)
    let categories

    if(stateCategories.length === 0){
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
    yield setEnabledCategories(categories);
  } catch (error) {
    yield put(actionSetCategoriesError(error));
  }
}

// CALLS

export function* onGetCategories() {
  yield takeLatest(
    CategoriesActionsTypes.SAGA_GET_CATEGORIES,
    getCategories
  );
}

export function* categoriesSagas() {
  yield all([call(onGetCategories)]);
}
