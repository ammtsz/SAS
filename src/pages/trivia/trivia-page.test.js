import React from "react";
import Trivia from "./trivia-page.component";

import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";

import { colorDarkBlue } from "../../assets/css/variables";

describe("Page component <Trivia />", () => {
  const mockStore = configureMockStore();
  const mockQuestionsAnswered = [];
  const mockCurrentQuestion = {};
  const mockCurrentOptions = [];

  describe("not loading", () => {
    const store = mockStore({
      quiz: {
        category: { id: 1, name: "Vehicles", completed: 2 },
        questionsAnswered: mockQuestionsAnswered,
        currentQuestion: mockCurrentQuestion,
        currentOptions: mockCurrentOptions,
        loading: false,
        difficulty: "medium",
        questionNumber: 3,
      },
    });
    store.dispatch = jest.fn();

    let component;

    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <MemoryRouter>
            <Trivia />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => {
      cleanup();
    });

    it("should render Trivia", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should contain 'Check Answer' button", () => {
      expect(screen.getByText("Check Answer")).toBeInTheDocument();
    });

    it("should have 'Check Answer' button read-only", () => {
      const btn = screen.getByText("Check Answer");
      
      fireEvent.click(btn);

      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it("should NOT have 'Check Answer' button changing on mouseEnter", () => {
      const btn = screen.getByText("Check Answer");

      expect(btn).toHaveStyle({backgroundColor: ({ theme }) => theme.btn1});
      fireEvent.mouseEnter(btn);
      expect(btn).toHaveStyle({backgroundColor: ({ theme }) => theme.btn1});
    });

  });
});
