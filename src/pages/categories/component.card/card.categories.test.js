import React from "react";
import Card from "./card.categories.components";

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import {
  actionSetQuizCategory,
  actionSetQuizActive,
  actionGetNewQuestion,
  actionStartQuiz,
} from "../../../redux/quiz/quiz.actions";

describe("Component categories-page <Card />", () => {
  const mockStore = configureMockStore();
  const mockReports = {
    1: {
      category_name: "",
      questions_answered: [],
      results: {
        difficulty: "",
        rights: "",
        wrongs: "",
      },
    },
  };
  const store = mockStore({
    categories: {
      reports: mockReports,
    },
    quiz: {},
  });
  store.dispatch = jest.fn();

  describe("Category completed: 0 questions (quiz not started)", () => {
    const mockCategory = { id: 1, name: "Books", completed: 0 };
    const mockProps = {
      category: mockCategory,
    };
    const history = createMemoryHistory();

    let component;
    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <Router history={history}>
            <Card {...mockProps} />
          </Router>
        </Provider>
      );
    });

    afterEach(() => {
      cleanup();
    });

    it("should render Card", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should contain 'Books' text", () => {
      expect(screen.getByText("Books")).toBeInTheDocument();
    });

    it("should call startQuiz()", () => {
      fireEvent.click(screen.getByTestId("category-card"));
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        actionStartQuiz({ category: mockCategory, history })
      );
    });

    it("should not contain 'see report' or 'continue' text", () => {
      expect(screen.queryByText("see report")).toEqual(null);
      expect(screen.queryByText("continue")).toEqual(null);
    });

    it("should NOT show progress bar", () => {
      expect(screen.queryByTestId("progress-bar")).toEqual(null);
    });
  });

  describe("Category completed: > 0 and < 10 questions (quiz in progress)", () => {
    const mockCategory = { id: 1, name: "Books", completed: 5 };
    const mockProps = {
      category: mockCategory,
    };
    const history = createMemoryHistory();

    let component;
    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <Router history={history}>
            <Card {...mockProps} />
          </Router>
        </Provider>
      );
    });

    afterEach(() => {
      cleanup();
    });

    it("should render Card", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should contain 'Books' text", () => {
      expect(screen.getByText("Books")).toBeInTheDocument();
    });

    it("should call startQuiz()", () => {
      fireEvent.click(screen.getByTestId("category-card"));
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        actionStartQuiz({ category: mockCategory, history })
      );
    });

    it("should contain 'continue' text", () => {
      expect(screen.getByText("continue")).toBeInTheDocument();
    });

    it("should show progress bar", () => {
      expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
    });

    it("should NOT redirect page", () => {
      expect(history.location.pathname).toEqual("/");
      fireEvent.click(screen.getByTestId("category-card"));
      expect(history.location.pathname).toEqual("/");
    });
  });

  describe("Category completed: 10 questions (finished quiz)", () => {
    const mockCategory = { id: 1, name: "Books", completed: 10 };

    const mockProps = {
      category: mockCategory,
    };

    const history = createMemoryHistory();

    let component;

    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <Router history={history}>
            <Card {...mockProps} />
          </Router>
        </Provider>
      );
    });

    it("should render Card", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should contain 'Books' text", () => {
      expect(screen.getByText("Books")).toBeInTheDocument();
    });

    it("should call startQuiz()", () => {
      fireEvent.click(screen.getByTestId("category-card"));
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        actionStartQuiz({ category: mockCategory, history })
      );
    });

    it("should contain 'see report' text", () => {
      expect(screen.getByText("see report")).toBeInTheDocument();
    });

    it("should NOT show progress bar", () => {
      expect(screen.queryByTestId("progress-bar")).toEqual(null);
    });

    it("should NOT redirect page", () => {
      expect(history.location.pathname).toEqual("/");
      fireEvent.click(screen.getByTestId("category-card"));
      expect(history.location.pathname).toEqual("/");
    });
  });
});
