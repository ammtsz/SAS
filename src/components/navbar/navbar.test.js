import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./navbar.render";

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
      expect(screen.getByText("Exit")).toBeInTheDocument();
    });
    
    it("should call signOut() method when click on 'Exit' button", () => {
        const exit = screen.getByText("Exit")
        fireEvent.click(exit)
        expect(signOut).toHaveBeenCalledTimes(1);
      });
  });

  describe("User is logged out", () => {
    const goToLogin = jest.fn()
    const mockProps = {
        user: null,
        goToLogin
    }
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Navbar {...mockProps} />
        </Provider>
      );
    });

    it("should show 'Fazer Login' on Navbar", () => {
      expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("should call goToLogin() method when click on 'Login' button", () => {
        const login = screen.getByText("Login")
        fireEvent.click(login)
        expect(goToLogin).toHaveBeenCalledTimes(1);
      });

  });
});
