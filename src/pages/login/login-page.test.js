import React from "react";
import PageLogin from "./login-page.component";

import { render, cleanup } from "@testing-library/react";

import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("Page component <PageLogin />", () => {
  const mockStore = configureMockStore();

  const store = mockStore({
    user: { error: null },
  });

  let component;
  
  beforeEach(() => {
    component = render(
      <Provider store={store}>
          <PageLogin />
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render PageLogin", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });
});
