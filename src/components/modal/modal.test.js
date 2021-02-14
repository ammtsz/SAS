import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ModalRender from "./modal.render.component";

import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("<ModalRender />", () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    quiz: {
      questionNumber: 1,
    },
  });
  const goToNextQuestion = jest.fn();

  describe("Right answer", () => {
    const mockProps = {
      right: true,
      goToNextQuestion,
      history: {},
      quizQuestionNumber: 1,
    };
    beforeEach(() => {
      render(
        <Provider store={store}>
          <ModalRender {...mockProps} />
        </Provider>
      );
    });

    it("should show 'Correct answer!' text", () => {
      expect(screen.getByText("Correct answer!")).toBeInTheDocument();
    });
    it("should have a green color", () => {
      expect(screen.getByTestId("card-modal")).toHaveStyle({
        border: "3px solid #32CB82",
      });
    });
    it("should show correct-icon", () => {
      expect(screen.getByAltText("correct")).toBeInTheDocument();
    });
    it("should call goToNextQuestion() on button click", () => {
      const button = screen.getByText("Next question");
      fireEvent.click(button);
      expect(goToNextQuestion).toHaveBeenCalledTimes(1);
      expect(goToNextQuestion).toHaveBeenCalledWith(mockProps.history);
    });
  });

  describe("Wrong answer", () => {
    const mockProps = {
      right: false,
      goToNextQuestion,
      history: {},
      quizQuestionNumber: 1,
    };
    beforeEach(() => {
      render(
        <Provider store={store}>
          <ModalRender {...mockProps} />
        </Provider>
      );
    });

    it("should show 'Wrong answer!' text", () => {
      expect(screen.getByText("Wrong answer")).toBeInTheDocument();
    });
    it("should have a red color", () => {
      expect(screen.getByTestId("card-modal")).toHaveStyle({
        border: "3px solid #FF4F4F",
      });
    });
    it("should show wrong-icon", () => {
      expect(screen.getByAltText("incorrect")).toBeInTheDocument();
    });
  });

  describe("Last question", () => {
    const mockProps = {
      right: true,
      goToNextQuestion,
      history: {},
      quizQuestionNumber: 10,
    };
    beforeEach(() => {
      render(
        <Provider store={store}>
          <ModalRender {...mockProps} />
        </Provider>
      );
    });
    it("should have button with text 'see report'", () => {
      expect(screen.getByText("See report")).toBeInTheDocument();
    });
    it("should call goToNextQuestion() on button click", () => {
      const button = screen.getByText("See report");
      fireEvent.click(button);
      expect(goToNextQuestion).toHaveBeenCalledTimes(1);
      expect(goToNextQuestion).toHaveBeenCalledWith(mockProps.history);
    });
  });
  describe("Not last question", () => {
    const mockProps = {
      right: true,
      goToNextQuestion,
      history: {},
      quizQuestionNumber: 9,
    };
    beforeEach(() => {
      render(
        <Provider store={store}>
          <ModalRender {...mockProps} />
        </Provider>
      );
    });
    it("should have button with text 'next question' if it's not last question", () => {
      expect(screen.getByText("Next question")).toBeInTheDocument();
    });
  });
});
