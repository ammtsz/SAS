import React from "react";
import Modal from "./modal.component";

import {
  colorRed,
  colorGreen,
} from "../../assets/css/variables";

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { createMemoryHistory } from "history";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import {
  actionGoToNextQuestion,
  actionUpdateQuizResumeReport,
} from "../../redux/quiz/quiz.actions";
import { MemoryRouter, Router } from "react-router-dom";

describe("Component <Modal />", () => {
  const mockStore = configureMockStore();

  describe("Correct answer before last question", () => {
    const store = mockStore({
      quiz: {
        questionNumber: 9,
      },
    });
    store.dispatch = jest.fn();

    const mockProps = {
      right: true,
    };

    let component;

    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <MemoryRouter>
            <Modal {...mockProps} />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => {
      cleanup();
    });

    it("should render Modal", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should show 'Correct answer!' text", () => {
      expect(screen.getByText("Correct answer!")).toBeInTheDocument();
    });

    it("should have a green border", () => {
      expect(screen.getByTestId("modal-card")).toHaveStyle({
        border: `3px solid ${colorGreen}`,
      });
    });

    it("should show correct-icon", () => {
      expect(screen.getByAltText("correct")).toBeInTheDocument();
    });

    it("should have button with text 'next question'", () => {
      expect(screen.getByText("Next question")).toBeInTheDocument();
    });

    it("should call nextQuestionActions() on button click", () => {
      const button = screen.getByText("Next question");
      fireEvent.click(button);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(actionGoToNextQuestion());
    });

    it("should hide Modal Component", () => {
      const button = screen.getByText("Next question");
      fireEvent.click(button);

      expect(screen.getByTestId("modal-card-container")).toHaveStyle({
        display: "none",
      });
    });
  });

  describe("Wrong answer before last question", () => {
    const store = mockStore({
      quiz: {
        questionNumber: 9,
      },
    });
    store.dispatch = jest.fn();

    const mockProps = {
      right: false,
    };

    let component;

    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <MemoryRouter>
            <Modal {...mockProps} />
          </MemoryRouter>
        </Provider>
      );
    });

    it("should render Modal", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should show 'Wrong answer!' text", () => {
      expect(screen.getByText("Wrong answer")).toBeInTheDocument();
    });

    it("should have a red border", () => {
      expect(screen.getByTestId("modal-card")).toHaveStyle({
        border: `3px solid ${colorRed}`,
      });
    });

    it("should show wrong-icon", () => {
      expect(screen.getByAltText("incorrect")).toBeInTheDocument();
    });

    it("should have button with text 'next question'", () => {
      expect(screen.getByText("Next question")).toBeInTheDocument();
    });

    it("should call nextQuestionActions() on button click", () => {
      const button = screen.getByText("Next question");
      fireEvent.click(button);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(actionGoToNextQuestion());
    });

    it("should hide Modal Component", () => {
      const button = screen.getByText("Next question");
      fireEvent.click(button);

      expect(screen.getByTestId("modal-card-container")).toHaveStyle({
        display: "none",
      });
    });
  });

  describe("Last question", () => {
    const store = mockStore({
      quiz: {
        questionNumber: 10,
      },
    });
    store.dispatch = jest.fn();

    const mockProps = {
      right: true,
      history: {
        push: jest.fn(),
      },
    };
    const history = createMemoryHistory();

    let component;

    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <Router history={history}>
            <Modal {...mockProps} />
          </Router>
        </Provider>
      );
    });

    it("should render Modal", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should have button with text 'see report'", () => {
      expect(screen.getByText("See report")).toBeInTheDocument();
    });

    it("should call updateQuizResumeReport() on button click", () => {
      const button = screen.getByText("See report");
      fireEvent.click(button);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        actionUpdateQuizResumeReport()
      );
    });

    it("should redirect to '/report' on button click", () => {
      const button = screen.getByText("See report");
      fireEvent.click(button);

      expect(history.location.pathname).toBe("/report");
    });

    it("should hide Modal Component", () => {
      const button = screen.getByText("See report");
      fireEvent.click(button);

      expect(screen.getByTestId("modal-card-container")).toHaveStyle({
        display: "none",
      });
    });
  });
});
