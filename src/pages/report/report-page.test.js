import React from "react";
import Report from "./report-page.component";

import { render, screen, cleanup } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";

describe("Page component <Report />", () => {
  const mockStore = configureMockStore();

  describe("Report created right after a quiz is finished", () => {
    const categoryId = 2;
    const categoryName = "Sports";

    const mockReports = {
      [categoryId]: {
        category_name: categoryName,
        results: {
          difficulty: {
            easy: { rights: 2, wrongs: 2 },
            medium: { rights: 2, wrongs: 2 },
            hard: { rights: 0, wrongs: 2 },
          },
          rights: 4,
          wrongs: 6,
        },
      },
    };
    const mockQuizCategory = {
      id: categoryId,
      name: categoryName,
      completed: 10,
    };
    const store = mockStore({
      categories: {
        reports: mockReports,
      },
      quiz: {
        category: mockQuizCategory,
      },
      report: {
        review: false,
        category: null,
      },
    });

    let component;

    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <MemoryRouter>
            <Report />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => {
      cleanup();
    });

    it("should render Report", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should contain 'congratulation' text", () => {
      expect(screen.getByText("Congratulation!")).toBeInTheDocument();
    });
  });

  describe("Report requested from categories page", () => {
    const categoryId = 1;
    const categoryName = "Board Games";

    const mockReports = {
      [categoryId]: {
        category_name: categoryName,
        results: {
          difficulty: {
            easy: { rights: 2, wrongs: 2 },
            medium: { rights: 2, wrongs: 2 },
            hard: { rights: 0, wrongs: 2 },
          },
          rights: 4,
          wrongs: 6,
        },
      },
    };
    const mockReportCategory = {
      id: categoryId,
      name: categoryName,
      completed: 10,
    };
    const store = mockStore({
      categories: {
        reports: mockReports,
      },
      quiz: {
        category: {},
      },
      report: {
        review: true,
        category: mockReportCategory,
      },
    });

    let component;

    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <MemoryRouter>
            <Report />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => {
      cleanup();
    });

    it("should render Report", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should contain category-name text", () => {
      expect(screen.getByText(categoryName)).toBeInTheDocument();
    });
  });
});
