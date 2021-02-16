import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HeaderTrivia from "./header.trivia.component";

import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import { actionFinishQuiz } from "../../../redux/quiz/quiz.actions";

describe("Component trivia-page <HeaderTrivia />", () => {
  const mockStore = configureMockStore();
  const mockCategory = { id: 1, name: "Animals", completed: 4 }

  const store = mockStore({
    quiz: {
      category: mockCategory,
    },
  });
  store.dispatch = jest.fn()

  let component
  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <HeaderTrivia />
      </Provider>
    );
  });

  it("should render HeaderTrivia", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should contain category name", () => {
    expect(screen.getByText(mockCategory.name)).toBeInTheDocument();
  });
  
  it("should contain close button", () => {
    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByAltText("close")).toBeInTheDocument();
  });
  
  it("should fire 'finishQuiz()' after clicking on close button", () => {
    const button = screen.getByTestId("trivia-close-button");
    fireEvent.click(button);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(actionFinishQuiz());
  });
});
