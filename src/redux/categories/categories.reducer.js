import { CategoriesActionsTypes } from "./categories.types";

const INITIAL_STATE = {
  reports: {},
  allCategories: [],
  error: null,
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoriesActionsTypes.REDUCER_SET_REPORTS:
      return { ...state, reports: action.payload };

    case CategoriesActionsTypes.REDUCER_SET_ALL_CATEGORIES:
      return { ...state, allCategories: action.payload };

    case CategoriesActionsTypes.REDUCER_SET_CATEGORIES_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default categoriesReducer;