import { call, takeLatest, put, select } from "redux-saga/effects";

import { fetchCategories } from "../../api/trivia";
import { rsf } from "../../firebase/firebase.utils";

import { CategoriesActionsTypes } from "./categories.types";
import {
  actionSetAllCategories,
  actionSetCategoriesReport,
} from "./categories.actions";

import { selectAllCategories } from "./categories.selectors";
import { selectUserDatas } from "../user/user.selectors";

import {
  onGetCategories,
  getCategories,
  getReportsFromDatabase,
  setCategoriesProgressStatus,
  saveCategories,
} from "./categories.sagas";

describe("categories.sagas", () => {
  describe("calls", () => {
    it("should trigger on SAGA_GET_CATEGORIES 'onGetCategories'", () => {
      const gen = onGetCategories();
      expect(gen.next().value).toEqual(
        takeLatest(CategoriesActionsTypes.SAGA_GET_CATEGORIES, getCategories)
      );
    });
  });

  // CALLED
  describe("'getCategories' with stateCategories.length === 0", () => {
    const gen = getCategories();
    it("should call 'getReportsFromDatabase'", () => {
      expect(gen.next().value).toEqual(getReportsFromDatabase());
    });

    it("should get 'selectAllCategories'", () => {
      expect(gen.next().value).toEqual(select(selectAllCategories));
    });

    it("should call 'fetchCategories' if stateCategories em empty", () => {
      const mockStateCategories = [];
      expect(gen.next(mockStateCategories).value).toEqual(fetchCategories());
    });

    it("should call 'setCategoriesProgressStatus'", () => {
      const mockCategories = [];
      expect(gen.next(mockCategories).value).toEqual(
        setCategoriesProgressStatus(mockCategories)
      );
    });

    it("should be done", () => {
      expect(gen.next().done).toEqual(true);
    });
  });

  describe("'getCategories' with stateCategories.length !== 0", () => {
    const gen = getCategories();
    gen.next();
    gen.next();

    it("should call 'fetchCategories' if stateCategories em empty", () => {
      const mockCategories = [1, 2, 3];
      expect(gen.next(mockCategories).value).toEqual(
        setCategoriesProgressStatus(mockCategories)
      );
    });

    it("should be done", () => {
      expect(gen.next().done).toEqual(true);
    });
  });

  // UTILS
  describe("'saveCategories'", () => {
    const mockCategory = { id: 1, name: "Television", completed: 8 };
    const gen = saveCategories(mockCategory);

    it("should call 'actionSetAllCategories'", () => {
      expect(gen.next(mockCategory).value).toEqual(
        put(actionSetAllCategories(mockCategory))
      );
    });

    it("should be done", () => {
      expect(gen.next().done).toEqual(true);
    });
  });

  describe("'getReportsFromDatabase' with userDatas !== null", () => {
    const gen = getReportsFromDatabase();

    it("should get 'selectUserDatas'", () => {
      expect(gen.next().value).toEqual(select(selectUserDatas));
    });

    it("should get reports from callbase if userDatas !== null", () => {
      const mockUserDatas = { id: "123" };
      expect(gen.next(mockUserDatas).value).toEqual(
        call(rsf.firestore.getDocument, `users/${mockUserDatas.id}`)
      );
    });
  });

  describe("'getReportsFromDatabase' with userDatas === null", () => {
    const gen = getReportsFromDatabase();
    gen.next();

    it("should get reports from localStorage if userDatas === null", () => {
      const mockUserDatas = null;
      const mockReports = {};
      expect(gen.next(mockUserDatas, mockReports).value).toEqual(
        put(actionSetCategoriesReport(mockReports))
      );
    });
  });
});
