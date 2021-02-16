import React from "react";
import Trivia from "./trivia-page.component";

import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";

import { colorGrey } from "../../assets/css/variables";

describe("Page component <Trivia />", () => {
  const mockStore = configureMockStore();
  const mockQuestionsDatas = [];
  const mockCurrentQuestion = {};
  const mockCurrentOptions = [];

  describe("not loading", () => {
    const store = mockStore({
      quiz: {
        category: { id: 1, name: "Vehicles", completed: 2 },
        questionsDatas: mockQuestionsDatas,
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

    it("should have 'Check Answer' button disabled", () => {
      const btn = screen.getByText("Check Answer");
      
      fireEvent.click(btn);

      expect(btn).toBeDisabled()
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it("should NOT have 'Check Answer' button changing on mouseEnter", () => {
      const btn = screen.getByText("Check Answer");

      expect(btn).toHaveStyle({backgroundColor: colorGrey});
      fireEvent.mouseEnter(btn);
      expect(btn).toHaveStyle({backgroundColor: colorGrey});
    });

  });
});
