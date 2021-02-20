import { CategoriesActionsTypes } from "./categories.types";

const INITIAL_STATE = {
  reports: {},
  allCategories: [],
  loading: false,
  error: null,
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoriesActionsTypes.REDUCER_SET_CATEGORIES_REPORT:
      return { ...state, reports: action.payload, error: null };

    case CategoriesActionsTypes.REDUCER_SET_ALL_CATEGORIES:
      return { ...state, allCategories: action.payload, error: null };

    case CategoriesActionsTypes.REDUCER_SET_CATEGORIES_LOADING:
      return { ...state, loading: action.payload };

    case CategoriesActionsTypes.REDUCER_SET_CATEGORIES_ERROR:
      return { ...state, error: action.payload };

    case CategoriesActionsTypes.REDUCER_RESET_CATEGORIES:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default categoriesReducer;
