import { CategoriesActionsTypes } from "./categories.types";

export const actionSetReports = (data) => ({
  type: CategoriesActionsTypes.REDUCER_SET_REPORTS,
  payload: data,
});

export const actionSetAllCategories = (data) => ({
  type: CategoriesActionsTypes.REDUCER_SET_ALL_CATEGORIES,
  payload: data,
});

export const actionSetCategoriesError = (data) => ({
  type: CategoriesActionsTypes.REDUCER_SET_CATEGORIES_ERROR,
  payload: data,
});

export const actionResetCategories = () => ({
  type: CategoriesActionsTypes.REDUCER_RESET_CATEGORIES,
});


export const actionGetCategories = (data) => ({
  type: CategoriesActionsTypes.SAGA_GET_CATEGORIES,
  payload: data,
});

export const actionGetReportsFromFirebase = (data) => ({
  type: CategoriesActionsTypes.SAGA_GET_REPORTS_FROM_FIREBASE,
  payload: data,
});
