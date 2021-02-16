import React from "react";
import SignUp from "./form-signUp.login.component";

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import {
  actionSetAuthError,
  actionEmailSignUp,
} from "../../../redux/user/user.actions.js";

describe("Component login-page <SignUp />", () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    user: {
      datas: null,
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
          <SignUp {...mockProps} />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render SignUp", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should contain 'Sign Up' text", () => {
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("should contain name, email, password and confirm-password inputs", () => {
    expect(screen.getByPlaceholderText("name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("confirm password")).toBeInTheDocument();
  });

  it("should NOT contain Persistence button", () => {
    expect(screen.queryByTestId("signin-persistence")).toEqual(null);
  });

  it("should contain 'Create account' and 'Log in' buttons", () => {
    expect(screen.getByText("Create account")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  it("should fire 'actionSetAuthError' if passwords don't match", () => {
    const displayName = "name";
    const email = "email@email.com";
    const password = "12345";
    const confirmPassword = "1234";

    const nameInput = screen.getByPlaceholderText("name");
    fireEvent.change(nameInput, { target: { value: displayName } });

    const emailInput = screen.getByPlaceholderText("email");
    fireEvent.change(emailInput, { target: { value: email } });

    const passwordInput = screen.getByPlaceholderText("password");
    fireEvent.change(passwordInput, { target: { value: password } });

    const confirmPasswordInput = screen.getByPlaceholderText(
      "confirm password"
    );
    fireEvent.change(confirmPasswordInput, {
      target: { value: confirmPassword },
    });

    expect(nameInput).toHaveValue(displayName);
    expect(emailInput).toHaveValue(email);
    expect(passwordInput).toHaveValue(password);
    expect(confirmPasswordInput).toHaveValue(confirmPassword);

    fireEvent.click(screen.getByText("Create account"));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      actionSetAuthError("passwords don't match")
    );
  });

  it("should fire 'handleSubmit' when click on 'Create account' button", () => {
    const displayName = "name";
    const email = "email@email.com";
    const password = "12345";
    const confirmPassword = password;

    const nameInput = screen.getByPlaceholderText("name");
    fireEvent.change(nameInput, { target: { value: displayName } });

    const emailInput = screen.getByPlaceholderText("email");
    fireEvent.change(emailInput, { target: { value: email } });

    const passwordInput = screen.getByPlaceholderText("password");
    fireEvent.change(passwordInput, { target: { value: password } });

    const confirmPasswordInput = screen.getByPlaceholderText(
      "confirm password"
    );
    fireEvent.change(confirmPasswordInput, {
      target: { value: confirmPassword },
    });

    expect(nameInput).toHaveValue(displayName);
    expect(emailInput).toHaveValue(email);
    expect(passwordInput).toHaveValue(password);
    expect(confirmPasswordInput).toHaveValue(confirmPassword);

    fireEvent.click(screen.getByText("Create account"));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      actionEmailSignUp({ email, password, displayName })
    );
  });

  it("should fire 'newAccount' when click on 'Log in' button", () => {
    fireEvent.click(screen.getByText("Log in"));
    expect(mockNewAccount).toHaveBeenCalledTimes(1);
  });
});
