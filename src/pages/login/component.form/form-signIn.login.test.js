import React from "react";
import SignIn from "./form-signIn.login.component";

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import {
  actionSetPersistence,
  actionEmailSignIn,
} from "../../../redux/user/user.actions";

describe("Component login-page <SignIn />", () => {
  const mockStore = configureMockStore();
  const mockPersistence = false;
  const store = mockStore({
    user: {
      datas: null,
      persistence: mockPersistence,
      error: null,
    },
  });
  store.dispatch = jest.fn();

  const mockNewAccount = jest.fn();
  const mockProps = {
    newAccount: mockNewAccount,
  };

  let component;
  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <SignIn {...mockProps} />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render SignIn", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should contain 'Login' text", () => {
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should contain email and password inputs", () => {
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
  });

  it("should contain Persistence button", () => {
    expect(screen.getByTestId("signin-persistence")).toBeInTheDocument();
  });

  it("should fire 'setPersistence' when click on switch-button", () => {
    fireEvent.click(screen.getByTestId("signin-persistence"));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      actionSetPersistence(!mockPersistence)
    );
  });

  it("should contain 'Log in' and 'Sign up' buttons", () => {
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("should fire 'handleSubmit' when click on 'Log in' button", () => {
    const email = "email@email.com";
    const password = "12345";

    const emailInput = screen.getByPlaceholderText("email");
    fireEvent.change(emailInput, { target: { value: email } });

    const passwordInput = screen.getByPlaceholderText("password");
    fireEvent.change(passwordInput, { target: { value: password } });

    expect(emailInput).toHaveValue(email);
    expect(passwordInput).toHaveValue(password);

    fireEvent.click(screen.getByText("Log in"));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      actionEmailSignIn({ email, password })
    );
  });

  it("should fire 'newAccount' when click on 'Sign Up' button", () => {
    fireEvent.click(screen.getByText("Sign up"));
    expect(mockNewAccount).toHaveBeenCalledTimes(1);
  });
});
