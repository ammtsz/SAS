import { CategoriesActionsTypes } from "./categories.types";

import {
  actionSetCategoriesReport,
  actionSetAllCategories,
  actionSetCategoriesError,
  actionResetCategories,
  actionGetCategories,
} from "./categories.actions";

describe("categories.actions", () => {
  describe("reducers actions", () => {
    it("should create the 'actionSetCategoriesReport' action", () => {
      const mockReports = {
        1: { category_name: "Mythology" },
        2: { category_name: "Gadgets" },
      };

      const action = actionSetCategoriesReport(mockReports);

      expect(action.type).toEqual(
        CategoriesActionsTypes.REDUCER_SET_CATEGORIES_REPORT
      );
      expect(action.payload).toEqual(mockReports);
    });

    it("should create the 'actionSetAllCategories' action", () => {
      const mockAllCategories = [
        { id: 1, name: "Mythology" },
        { id: 2, name: "Gadgets" },
      ];

      const action = actionSetAllCategories(mockAllCategories);

      expect(action.type).toEqual(
        CategoriesActionsTypes.REDUCER_SET_ALL_CATEGORIES
      );
      expect(action.payload).toEqual(mockAllCategories);
    });

    it("should create the 'actionSetCategoriesError' action", () => {
      const mockError = "error";

      const action = actionSetCategoriesError(mockError);

      expect(action.type).toEqual(
        CategoriesActionsTypes.REDUCER_SET_CATEGORIES_ERROR
      );
      expect(action.payload).toEqual(mockError);
    });

    it("should create the 'actionResetCategories' action", () => {
      expect(actionResetCategories().type).toEqual(
        CategoriesActionsTypes.REDUCER_RESET_CATEGORIES
      );
    });
  });
  describe("sagas actions", () => {
    it("should create the 'actionGetCategories' action", () => {
      expect(actionGetCategories().type).toEqual(
        CategoriesActionsTypes.SAGA_GET_CATEGORIES
      );
    });
  });
});
