import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CardRender from "./card.categories.render.components";

import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("Categories <CardRender />", () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    categories: {
      reports: {
        1: {
          category_name: "",
          questions_datas: [],
          results: {
            difficulty: "",
            rights: "",
            wrongs: "",
          },
        },
      },
    },
    quiz: {},
  });

  const setQuizCategory = jest.fn();
  const setQuizActive = jest.fn();
  const getNewQuestion = jest.fn();
  const history = { push: () => {} };

  describe("New category (quiz not started)", () => {
    const category = { id: 1, name: "Books", completed: 0 };
    const mockProps = {
      category,
      setQuizCategory,
      setQuizActive,
      getNewQuestion,
      history,
    };

    beforeEach(() => {
      render(
        <Provider store={store}>
          <CardRender {...mockProps} />
        </Provider>
      );
    });

    it("should contain 'Books' text", () => {
      expect(screen.getByText("Books")).toBeInTheDocument();
    });

    it("should call startQuiz() and its methods", () => {
      fireEvent.click(screen.getByTestId("category-card"));
      expect(setQuizCategory).toHaveBeenCalledWith(category);
      expect(setQuizActive).toHaveBeenCalledWith(true);
      expect(getNewQuestion).toHaveBeenCalled();
    });

    it("should not contain 'see report' or 'continue' text", () => {
      expect(screen.queryByText("see report")).toEqual(null);
      expect(screen.queryByText("continue")).toEqual(null);
    });

    it("should match snapshot", () => {
      expect(screen.getByTestId("category-card")).toMatchSnapshot();
    });
  });

  describe("In progress category (quiz have been started)", () => {
    const category = { id: 1, name: "Books", completed: 5 };
    const setReportReviewCategory = jest.fn();
    const resumeQuiz = jest.fn();

    const mockProps = {
      category,
      setQuizCategory,
      setQuizActive,
      getNewQuestion,
      history,
      setReportReviewCategory,
      resumeQuiz,
    };

    beforeEach(() => {
      render(
        <Provider store={store}>
          <CardRender {...mockProps} />
        </Provider>
      );
    });

    it("should contain 'Books' text", () => {
      expect(screen.getByText("Books")).toBeInTheDocument();
    });
    it("should NOT call startQuiz() and its methods", () => {
      fireEvent.click(screen.getByTestId("category-card"));
      expect(setQuizCategory).toHaveBeenCalledTimes(0);
    });
    it("should contain 'continue' text", () => {
      expect(screen.getByText("continue")).toBeInTheDocument();
    });
    it("should match snapshot", () => {
      expect(screen.getByTestId("category-card")).toMatchSnapshot();
    });
  });

  describe("Completed category (finished quiz)", () => {
    const category = { id: 1, name: "Books", completed: 10 };
    const setReportReviewCategory = jest.fn();
    const resumeQuiz = jest.fn();

    const mockProps = {
      category,
      setQuizCategory,
      setQuizActive,
      getNewQuestion,
      history,
      setReportReviewCategory,
      resumeQuiz,
    };

    beforeEach(() => {
      render(
        <Provider store={store}>
          <CardRender {...mockProps} />
        </Provider>
      );
    });

    it("should contain 'Books' text", () => {
      expect(screen.getByText("Books")).toBeInTheDocument();
    });
    it("should NOT call startQuiz() and its methods", () => {
      fireEvent.click(screen.getByTestId("category-card"));
      expect(setQuizCategory).toHaveBeenCalledTimes(0);
    });
    it("should contain 'see report' text", () => {
      expect(screen.getByText("see report")).toBeInTheDocument();
    });
    it("should match snapshot", () => {
      expect(screen.getByTestId("category-card")).toMatchSnapshot();
    });
  });
});
