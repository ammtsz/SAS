import React from "react";
import Categories from "./categories-page.component";

import { render, screen, cleanup } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";

import { actionGetCategories } from "../../redux/categories/categories.actions";
import { actionResetReport } from "../../redux/report/report.actions";
import { actionResetQuiz } from "../../redux/quiz/quiz.actions";

describe("Page component <Categories />", () => {
  const mockStore = configureMockStore();
  const mockAllCategories = [
    { id: 1, name: "Books" },
    { id: 2, name: "History" },
    { id: 3, name: "Sports" },
  ];

  const store = mockStore({
    categories: {
      allCategories: mockAllCategories,
      reports: {},
    },
    user: {
      datas: null,
    },
  });
  store.dispatch = jest.fn();

  let component;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <Categories />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("shoud render Categories", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });
  
  it("shoud fire methods called on useEffect()", () => {
    expect(store.dispatch).toHaveBeenCalledTimes(3)
    expect(store.dispatch).toHaveBeenCalledWith(actionGetCategories())
    expect(store.dispatch).toHaveBeenCalledWith(actionResetReport())
    expect(store.dispatch).toHaveBeenCalledWith(actionResetQuiz())
  });

  it("shoud have the same amount of <Card /> as categories", () => {
    expect(screen.getAllByTestId("category-card").length).toEqual(
      mockAllCategories.length
    );
  });

  it("shoud print categories name on Cards", () => {
    expect(screen.getByText("Books")).toBeInTheDocument();
    expect(screen.getByText("History")).toBeInTheDocument();
    expect(screen.getByText("Sports")).toBeInTheDocument();
  });

  it("shoud print categories amount number", () => {
    expect(
      screen.getByText(`(${mockAllCategories.length})`)
    ).toBeInTheDocument();
  });
});
