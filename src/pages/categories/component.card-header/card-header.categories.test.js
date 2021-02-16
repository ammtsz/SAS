import React from "react";
import CardHeader from "./card-header.categories.component";

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import { actionSetReportReviewCategory } from "../../../redux/report/report.actions";
import { actionResumeQuiz } from "../../../redux/quiz/quiz.actions";

describe("Component categories-page <CardHeader />", () => {
  const mockStore = configureMockStore();

  const mockHistory = {
    push: jest.fn(),
    location: { pathname: "/" },
  };

  describe("Category completed: > 0 and < 10 questions (quiz in progress)", () => {
    const mockReports = {
      1: {
        category_name: "",
        questions_datas: [],
        results: {
          difficulty: "",
          rights: 3,
          wrongs: 2,
        },
      },
    };
    const store = mockStore({
      categories: {
        reports:mockReports,
      },
      quiz: {},
    });
    store.dispatch = jest.fn();

    const mockCategory = { id: 1, name: "Books", completed: 5 };

    const mockProps = {
      category: mockCategory,
      history: mockHistory
    };

    let component;
    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <MemoryRouter>
            <CardHeader {...mockProps} />
          </MemoryRouter>
        </Provider>
      );
    });
    
    afterEach(() => {
      cleanup()
    })
    
    it("should render CardHeader", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should contain 'continue' text", () => {
      expect(screen.getByText("continue")).toBeInTheDocument();
    });

    it("should contain '<ProgressBar />' component", () => {
      expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
    });

    it("should print 5 colored units in '<ProgressBar />' component", () => {
      expect(screen.getAllByTestId("progress-bar-colored").length).toBe(5);
    });

    it("should NOT contain results text '3/5'", () => {
      expect(screen.queryByTestId("card-header-results")).toEqual(null);
    });

    it("should fire 'resumeQuiz()' when click on 'continue' text", () => {
      fireEvent.click(screen.getByText("continue"));
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(actionResumeQuiz(mockCategory));
    });

    it("should redirect to '/quiz' page when click on 'continue' text", () => {
      fireEvent.click(screen.getByText("continue"));
      expect(mockProps.history.push).toHaveBeenCalledTimes(1)
      expect(mockProps.history.push).toHaveBeenCalledWith("/quiz")
    })
  });

  describe("Category completed: 10 questions (finished quiz)", () => {
    const reports = {
      1: {
        category_name: "",
        questions_datas: [],
        results: {
          difficulty: "",
          rights: 7,
          wrongs: 3,
        },
      },
    };
    const store = mockStore({
      categories: {
        reports,
      },
      quiz: {},
    });
    store.dispatch = jest.fn()

    const mockCategory = { id: 1, name: "Books", completed: 10 };
    
    const mockProps = {
      category: mockCategory,
      history: mockHistory,
    };

    let component
    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <CardHeader {...mockProps} />
        </Provider>
      );
    });

    afterEach(() => {
      cleanup()
    })

    it("should render CardHeader", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should contain 'see report' text", () => {
      expect(screen.getByText("see report")).toBeInTheDocument();
    });

    it("should NOT contain '<ProgressBar />' component", () => {
      expect(screen.queryByTestId("progress-bar")).toEqual(null);
    });

    it("should contain '7/10' text", () => {
      expect(screen.getByText("7/10")).toBeInTheDocument();
      expect(screen.getByTestId("card-header-results")).toBeInTheDocument();
    });

    it("should fire 'setReportReviewCategory()' when click on 'see report' text", () => {
      fireEvent.click(screen.getByText("see report"));
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(actionSetReportReviewCategory(mockCategory));
    });

    it("should redirect to '/report' page when click on 'see report' text", () => {
      fireEvent.click(screen.getByText("see report"));
      expect(mockProps.history.push).toHaveBeenCalledTimes(1)
      expect(mockProps.history.push).toHaveBeenCalledWith("/report")
    })
  });
});
