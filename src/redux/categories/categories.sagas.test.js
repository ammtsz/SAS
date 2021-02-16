import { call, takeLatest, put, select } from "redux-saga/effects";

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

  //   describe("'setCategoriesProgressStatus'", () => {
  //     const mockCategories = [
  //       { id: 1 },{ id: 2 },{ id: 3 },{ id: 4 },{ id: 5 }
  //     ]

  //     const gen = setCategoriesProgressStatus(mockCategories);

  //     it("should call 'saveCategories'", () => {
  //       let mockReports = gen.next().value;
  //       expect(mockReports).toEqual(select(selectReports));

  //       const mockCategoryWithStatus = [1, 2, 3];
  //       mockReports = {
  //         1: { questions_datas: [1, 2, 3] },
  //         2: { questions_datas: [1, 2, 3, 4, 5, 6] },
  //         3: { questions_datas: [1, 2, 3, 4, 5] },
  //       };

  //       expect(gen.next(mockReports, mockCategoryWithStatus).value).toEqual(
  //         saveCategories(mockCategoryWithStatus)
  //       );
  //     });

  //   });
});
