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
} from "../../../redux/quiz/quiz.actions";

describe("Component categories-page <Card />", () => {
  const mockStore = configureMockStore();
  const mockReports = {
    1: {
      category_name: "",
      questions_datas: [],
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

    it("should call startQuiz() and its methods", () => {
      fireEvent.click(screen.getByTestId("category-card"));
      expect(store.dispatch).toHaveBeenCalledTimes(3);
      expect(store.dispatch).toHaveBeenCalledWith(
        actionSetQuizCategory(mockCategory)
      );
      expect(store.dispatch).toHaveBeenCalledWith(actionSetQuizActive(true));
      expect(store.dispatch).toHaveBeenCalledWith(
        actionGetNewQuestion({ difficulty: "medium", category: mockCategory.id })
      );
    });

    it("should not contain 'see report' or 'continue' text", () => {
      expect(screen.queryByText("see report")).toEqual(null);
      expect(screen.queryByText("continue")).toEqual(null);
    });

    it("should NOT show progress bar", () => {
      expect(screen.queryByTestId("progress-bar")).toEqual(null);
    });

    it("should redirect page to '/quiz' when click on card", () => {
      fireEvent.click(screen.getByTestId("category-card"));
      expect(history.location.pathname).toEqual("/quiz");
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

    it("should NOT call startQuiz() and its methods", () => {
      fireEvent.click(screen.getByTestId("category-card"));
      expect(store.dispatch).toHaveBeenCalledTimes(0);
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

    const history = createMemoryHistory()

    let component

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
      expect(component.asFragment()).toMatchSnapshot()
    })

    it("should contain 'Books' text", () => {
      expect(screen.getByText("Books")).toBeInTheDocument();
    });
    
    it("should NOT call startQuiz() and its methods", () => {
      fireEvent.click(screen.getByTestId("category-card"));
      expect(store.dispatch).toHaveBeenCalledTimes(0);
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
