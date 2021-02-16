import React from "react";
import App from "./App";

import { render, cleanup } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";

import {
  actionSetUserAuth,
  actionGetUserTheme,
} from "./redux/user/user.actions";

describe("Component <App />", () => {
  const mockStore = configureMockStore();

  const store = mockStore({
    user: {
      datas: null,
      theme: "light",
    },
    quiz: {
      active: false,
    },
    report: {
      category: null,
    },
  });
  store.dispatch = jest.fn();

  let component;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render App", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it("shoud fire methods called on useEffect()", () => {
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(actionSetUserAuth());
    expect(store.dispatch).toHaveBeenCalledWith(actionGetUserTheme());
  });
});
