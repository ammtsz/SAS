import { CategoriesActionsTypes } from "./categories.types";
import categoriesReducer from "./categories.reducer";

const INITIAL_STATE = {
  reports: {},
  allCategories: [],
  error: null,
};

describe("categoriesReducer", () => {
  it("should return initial state", () => {
    expect(categoriesReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should set 'reports' to payload and 'error' to null", () => {
    const mockReports = {
      1: { category_name: "Mythology" },
      2: { category_name: "Gadgets" },
    };
    expect(
      categoriesReducer(INITIAL_STATE, {
        type: CategoriesActionsTypes.REDUCER_SET_CATEGORIES_REPORT,
        payload: mockReports,
      })
    ).toEqual({...INITIAL_STATE, reports: mockReports, error: null});
  });

  it("should set 'allCategories' to payload and 'error' to null", () => {
    const mockAllCategories = [
        {id: 1, name: "Mythology"},
        {id: 2, name: "Gadgets"},
    ]
      expect(
        categoriesReducer(INITIAL_STATE, {
          type: CategoriesActionsTypes.REDUCER_SET_ALL_CATEGORIES,
          payload: mockAllCategories,
        })
      ).toEqual({...INITIAL_STATE, allCategories: mockAllCategories, error: null});
  });

  it("should set 'error' to payload", () => {
    expect(
      categoriesReducer(INITIAL_STATE, {
        type: CategoriesActionsTypes.REDUCER_SET_CATEGORIES_ERROR,
        payload: "error",
      }).error
    ).toBe("error");
  });

  it("should reset categories state", () => {
    expect(
      categoriesReducer(INITIAL_STATE, {
        type: CategoriesActionsTypes.REDUCER_RESET_CATEGORIES,
      })
    ).toEqual(INITIAL_STATE);
  });
});
