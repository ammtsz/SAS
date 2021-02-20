import React from "react";
import QATrivia from "./card-qa.trivia.component";

import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";

import {
  colorBlue,
  colorGrey,
} from "../../../assets/css/variables";

describe("Component trivia-page <QATrivia />", () => {
  const mockStore = configureMockStore();

  const question =
    "What year was Huun Huur Tu's album Altai Sayan Tandy-Uula released?";

  const mockQuestionsAnswered = [];
  const mockCurrentQuestion = { question };
  const mockCurrentOptions = [
    { id: 0, option: "2004" },
    { id: 1, option: "1993" },
    { id: 2, option: "2006" },
    { id: 3, option: "2010" },
  ];

  const store = mockStore({
    quiz: {
      category: { id: 1, name: "Music", completed: 5 },
      questionsAnswered: mockQuestionsAnswered,
      currentQuestion: mockCurrentQuestion,
      currentOptions: mockCurrentOptions,
      loading: false,
      difficulty: "hard",
      questionNumber: 6,
    },
  });

  const mockSetDisabled = jest.fn();
  const mockSetSelectedOption = jest.fn();

  const mockProps = {
    setSelectedOption: mockSetSelectedOption,
    setDisabled: mockSetDisabled,
  };

  let component;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <QATrivia {...mockProps} />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render QATrivia", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should contain question text", () => {
    expect(screen.getByText(question)).toBeInTheDocument();
  });

  it("should contain 4 options to select", () => {
    expect(screen.getAllByTestId("trivia-card-option-text").length).toEqual(4);
  });

  it("should fire 'setSelectedOption' and 'setDisabled' methods when select an option", () => {
    const option0 = screen.getByTestId("trivia-card-option-0");
    const option1 = screen.getByTestId("trivia-card-option-1");

    fireEvent.click(option0);
    expect(mockSetSelectedOption).toHaveBeenCalledTimes(2);
    expect(mockSetSelectedOption).toHaveBeenCalledWith("0");
    expect(mockSetSelectedOption).not.toHaveBeenCalledWith("1");
    expect(mockSetDisabled).toHaveBeenCalledTimes(1);
    expect(mockSetDisabled).toHaveBeenCalledWith(false);

    fireEvent.click(option1);
    expect(mockSetSelectedOption).toHaveBeenCalledTimes(3);
    expect(mockSetSelectedOption).toHaveBeenCalledWith("1");
    expect(mockSetDisabled).toHaveBeenCalledTimes(2);
    expect(mockSetDisabled).toHaveBeenCalledWith(false);
  });

  it("should highlight the card option when click in the option", () => {
    const option2 = screen.getByTestId("trivia-card-option-2");
    const option3 = screen.getByTestId("trivia-card-option-3");

    expect(option2).toHaveStyle({ border: `1px solid ${colorGrey}` });
    fireEvent.click(option2);
    expect(option2).toHaveStyle({ border: `3px solid ${colorBlue}` });

    fireEvent.click(option3);
    expect(option3).toHaveStyle({ border: `3px solid ${colorBlue}` });
    expect(option2).toHaveStyle({ border: `1px solid ${colorGrey}` });

  });
});
