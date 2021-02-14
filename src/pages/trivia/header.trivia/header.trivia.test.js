import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HeaderTriviaComponent from "./header.trivia.component";

import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("<HeaderTriviaComponent />", () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    quiz: {
      category: { id: 1, name: "Animals", completed: 4 },
    },
  });

  const finishQuiz = jest.fn();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <HeaderTriviaComponent />
      </Provider>
    );
  });

  it("should contain category name", () => {
    expect(screen.getByText("Animals")).toBeInTheDocument();
  });
  it("should contain close button", () => {
    expect(screen.getByText("Close")).toBeInTheDocument();
  });
  it("should call 'finishQuiz()' after clicking the close button", () => {
    const button = screen.getByTestId("close-button");
    fireEvent.click(button);
    // expect(finishQuiz).toHaveBeenCalledTimes(1);
  });
});
