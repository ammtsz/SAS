import { CategoriesActionsTypes } from "./categories.types";

// REDUCERS
export const actionSetCategoriesReport = (data) => ({
  type: CategoriesActionsTypes.REDUCER_SET_CATEGORIES_REPORT,
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


// SAGAS
export const actionGetCategories = (data) => ({
  type: CategoriesActionsTypes.SAGA_GET_CATEGORIES,
  payload: data,
});