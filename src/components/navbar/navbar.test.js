import React from "react";
import Navbar from "./navbar.component";

import { createMemoryHistory } from "history";

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import {
  actionSignOut,
  actionSetUserTheme,
  actionUpdateThemeOnDatabase,
} from "../../redux/user/user.actions";
import { actionResetCategories } from "../../redux/categories/categories.actions";
import { actionResetReport } from "../../redux/report/report.actions";
import { actionResetQuiz } from "../../redux/quiz/quiz.actions";

describe("Component <Navbar />", () => {
  const mockStore = configureMockStore();
  const name = "Peter";

  describe("User is logged in", () => {
    const store = mockStore({
      user: { datas: { displayName: name } },
    });

    store.dispatch = jest.fn();

    const mockProps = {
      history: { push: jest.fn() },
    };

    let component;

    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <MemoryRouter>
            <Navbar {...mockProps} />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => {
      cleanup();
    });

    it("should render Navbar", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should show User's name on Navbar", () => {
      expect(screen.getByText(`Hello, ${name}`)).toBeInTheDocument();
    });

    it("should fire 'signOutActions()' when click on 'Log out' button", () => {
      expect(screen.getByText("Log out")).toBeInTheDocument();

      const exit = screen.getByText("Log out");
      fireEvent.click(exit);

      expect(store.dispatch).toHaveBeenCalledTimes(4);
      expect(store.dispatch).toHaveBeenCalledWith(actionResetQuiz());
      expect(store.dispatch).toHaveBeenCalledWith(actionResetCategories());
      expect(store.dispatch).toHaveBeenCalledWith(actionResetReport());
      expect(store.dispatch).toHaveBeenCalledWith(actionSignOut());
    });

    it("should not redirect page when click on 'Log out' button", () => {
      expect(screen.getByText("Log out")).toBeInTheDocument();

      const exit = screen.getByText("Log out");
      fireEvent.click(exit);

      expect(mockProps.history.push).toHaveBeenCalledTimes(0);
    });
  });

  describe("User is logged out and it's on login page", () => {
    const store = mockStore({
      user: { datas: null },
    });

    store.dispatch = jest.fn();

    const mockProps = {
      history: {
        push: jest.fn(),
      },
    };

    const history = createMemoryHistory();
    history.push("/login");

    let component;

    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <Router history={history}>
            <Navbar {...mockProps} />
          </Router>
        </Provider>
      );
    });

    afterEach(() => {
      cleanup();
    });

    it("should render Navbar", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should show 'skip log in' on Navbar", () => {
      expect(screen.getByText("skip log in")).toBeInTheDocument();
    });

    it("should redirect page when click on 'skip log in' button", () => {
      const skipLogin = screen.getByText("skip log in");
      expect(skipLogin).toBeInTheDocument();

      expect(history.location.pathname).toBe("/login");

      fireEvent.click(skipLogin);
      expect(history.location.pathname).toBe("/");
    });
  });

  describe("User is logged out and on homepage", () => {
    const store = mockStore({
      user: { datas: null },
    });

    store.dispatch = jest.fn();

    const mockProps = {
      history: {
        push: jest.fn(),
      },
    };

    const history = createMemoryHistory();
    history.push("/");

    let component;

    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <Router history={history}>
            <Navbar {...mockProps} />
          </Router>
        </Provider>
      );
    });

    afterEach(() => {
      cleanup();
    });

    it("should render Navbar", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should show 'Log in' on Navbar", () => {
      expect(screen.getByText("Log in")).toBeInTheDocument();
    });

    it("should redirect page to '/login' when click on 'Log in' button", () => {
      const skipLogin = screen.getByText("Log in");
      expect(skipLogin).toBeInTheDocument();

      expect(history.location.pathname).toBe("/");

      fireEvent.click(skipLogin);
      expect(history.location.pathname).toBe("/login");
    });
  });

  describe("Theme toggle button", () => {
    const theme1 = "dark"
    const theme2 = "light"
    const store = mockStore({
      user: { theme: theme1 },
    });

    store.dispatch = jest.fn();

    let component;

    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => {
      cleanup();
    });

    it("should render Navbar", () => {
      expect(component.asFragment()).toMatchSnapshot();
    });

    it("should call 'setUserTheme' actions when click on swicth button", () => {
      const switcher = screen.getByText(theme1);
      fireEvent.click(switcher);

      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch).toHaveBeenCalledWith(actionSetUserTheme(theme2));
      expect(store.dispatch).toHaveBeenCalledWith(
        actionUpdateThemeOnDatabase(theme2)
      );
    });

    it("should 'uncheck' checkbox when click on swicth button", () => {
      const switcher = screen.getByText(theme1);
      fireEvent.click(switcher);

      expect(switcher).not.toBeChecked();
    });
  });
});
