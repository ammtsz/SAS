import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CardHeader from "./card-header.categories.component";

import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("Categories <CardHeader />", () => {
  const mockStore = configureMockStore();
  const history = { push: () => {} };
  const setReportReviewCategory = jest.fn();
  const resumeQuiz = jest.fn();

  describe("In progress category (quiz have been started)", () => {
    const store = mockStore({
      categories: {
        reports: {
          1: {
            category_name: "",
            questions_datas: [],
            results: {
              difficulty: "",
              rights: 3,
              wrongs: 2,
            },
          },
        },
      },
      quiz: {},
    });
    const category = { id: 1, name: "Books", completed: 5 };
    const mockProps = {
      category,
      history,
    };

    beforeEach(() => {
      render(
        <Provider store={store}>
          <CardHeader {...mockProps} />
        </Provider>
      );
    });

    it("should contain 'continue' text", () => {
      expect(screen.getByText("continue")).toBeInTheDocument();
    });
    it("should contain '<ProgressBar />' component", () => {
      expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
    });
    it("should NOT contain '3/5' text", () => {
      expect(screen.queryByText("3/5")).toEqual(null);
    });
    // it("should call 'resumeQuiz()' method", () => {
    //   fireEvent.click(screen.getByText("continue"))
    //   expect(resumeQuiz).toHaveBeenCalled();
    // });
  });

  describe("Completed category (finished quiz)", () => {
    const store = mockStore({
      categories: {
        reports: {
          1: {
            category_name: "",
            questions_datas: [],
            results: {
              difficulty: "",
              rights: 7,
              wrongs: 3,
            },
          },
        },
      },
      quiz: {},
    });
    const category = { id: 1, name: "Books", completed: 10 };
    const mockProps = {
      category,
      history,
    };

    beforeEach(() => {
      render(
        <Provider store={store}>
          <CardHeader {...mockProps} />
        </Provider>
      );
    });

    it("should contain 'see report' text", () => {
      expect(screen.getByText("see report")).toBeInTheDocument();
    });
    it("should NOT contain '<ProgressBar />' component", () => {
      expect(screen.queryByTestId("progress-bar")).toEqual(null);
    });
    it("should contain '7/10' text", () => {
      expect(screen.getByText("7/10")).toBeInTheDocument();
    });
    // it("should call 'setReportReviewCategory()' method", () => {
    //   fireEvent.click(screen.getByTestId("click-report"));
    //   expect(setReportReviewCategory).toHaveBeenCalled();
    // });
  });
});
