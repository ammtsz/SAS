import React from "react";
import CardHeaderTrivia from "./card-header.trivia.component";

import { render, screen, cleanup } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("component trivia-page <CardHeaderTrivia />", () => {
  const mockStore = configureMockStore();
  const mockQuestionNumber = 3;
  const store = mockStore({
    quiz: {
      difficulty: "medium",
      questionNumber: mockQuestionNumber,
    },
  });

  let component;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <CardHeaderTrivia />
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render CardHeaderTrivia", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should print question number", () => {
    expect(
      screen.getByText(`Question ${mockQuestionNumber}`)
    ).toBeInTheDocument();
  });

  it("should print 2 stars for 'medium' difficulty", () => {
    expect(screen.getByAltText("star-level-easy")).not.toHaveClass("starless");
    expect(screen.getByAltText("star-level-medium")).not.toHaveClass("starless");
    expect(screen.getByAltText("star-level-hard")).toHaveClass("starless");
  });

  it("should contain 'Medium' text", () => {
    expect(screen.queryByText("Easy")).toEqual(null);
    expect(screen.queryByText("Medium")).toBeInTheDocument();
    expect(screen.queryByText("Hard")).toEqual(null);
  });
});
