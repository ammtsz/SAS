import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./navbar.component";

import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("<Navbar />", () => {
  const mockStore = configureMockStore();
  const store = mockStore({});

  describe("User is logged in", () => {
    const signOut = jest.fn()
    const mockProps = {
        user: { displayName: "Peter" },
        signOut
    }
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Navbar {...mockProps} />
        </Provider>
      );
    });

    it("should show User's name on Navbar", () => {
      expect(screen.getByText("Hello, Peter")).toBeInTheDocument();
      expect(screen.getByText("Log out")).toBeInTheDocument();
    });
    
    it("should call signOut() method when click on 'Log out' button", () => {
        const exit = screen.getByText("Log out")
        fireEvent.click(exit)
        expect(signOut).toHaveBeenCalledTimes(1);
      });
  });

  describe("User is logged out and on homepage", () => {
    const goToLogin = jest.fn()
    const mockProps = {
        user: null,
        goToLogin,
        history: {location: {pathname: "/"}}
    }
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Navbar {...mockProps} />
        </Provider>
      );
    });

    it("should show 'Log in' on Navbar", () => {
      expect(screen.getByText("Log in")).toBeInTheDocument();
    });

    it("should call goToLogin() method when click on 'Log in' button", () => {
        const login = screen.getByText("Log in")
        fireEvent.click(login)
        expect(goToLogin).toHaveBeenCalledTimes(1);
      });

  });

  describe("User is logged out and on login page", () => {
    const goToCategories = jest.fn()
    const mockProps = {
        user: null,
        goToCategories,
        history: {location: {pathname: "/login"}}
    }
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Navbar {...mockProps} />
        </Provider>
      );
    });

    it("should show 'Log in' on Navbar", () => {
      expect(screen.getByText("continue without log in")).toBeInTheDocument();
    });

    it("should call goToCategories() method when click on 'continue without log in' button", () => {
        const login = screen.getByText("continue without log in")
        fireEvent.click(login)
        expect(goToCategories).toHaveBeenCalledTimes(1);
      });

  });
});
