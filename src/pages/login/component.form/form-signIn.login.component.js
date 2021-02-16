import React, { useEffect, useState } from "react";

import { FormTitle, Form, ButtonLogin } from "./form.login.styles";

import FormInput from "../component.form-input/form-input.login.component";
import ButtonSwitch from "../../../components/button-switch/button-switch.component";
import ErrorMessage from "../component.error-message/error-message.login.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  actionSetPersistence,
  actionEmailSignIn,
} from "../../../redux/user/user.actions";
import {
  selectPersistence,
  selectAuthError,
} from "../../../redux/user/user.selectors";

const mapStateToProps = createStructuredSelector({
  persistence: selectPersistence,
  error: selectAuthError,
});

const mapDispatchToProps = (dispatch) => ({
  setPersistence: (data) => dispatch(actionSetPersistence(data)),
  emailSignIn: (data) => dispatch(actionEmailSignIn(data)),
});

const SignIn = ({
  persistence,
  error,
  setPersistence,
  emailSignIn,
  newAccount,
}) => {
  const [inputDatas, setInputDatas] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputDatas;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputDatas({ ...inputDatas, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    emailSignIn({ email, password });
    localStorage.removeItem("trivia");
    localStorage.removeItem("triviaTheme");
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      document.querySelector("#signIn-error").focus();
    }
  }, [error]);

  return (
    <React.Fragment>
      <FormTitle>Login</FormTitle>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <FormInput
          type="email"
          name="email"
          id="signin-email"
          placeholder="email"
          label={<i className="fas fa-envelope"></i>}
          handleChange={(event) => handleChange(event)}
        />
        <FormInput
          type="password"
          name="password"
          id="signin-password"
          placeholder="password"
          label={<i className="fas fa-lock"></i>}
          handleChange={(event) => handleChange(event)}
        />

        <ErrorMessage
          tabIndex="0"
          id="signIn-error"
          error={error}
          message={
            error
              ? error.code === "auth/invalid-email" ||
                error.code === "auth/user-not-found" ||
                error.code === "auth/wrong-password"
                ? "invalid email and/or password"
                : "Something went wrong. Please try again later."
              : ""
          }
        />

        <ButtonSwitch
          id="signin-persistence"
          data-testid="signin-persistence"
          label="keep me logged in"
          checked={persistence}
          onChange={(event) => setPersistence(event.target.checked)}
        />

        <ButtonLogin type="submit">Log in</ButtonLogin>
        <ButtonLogin onClick={() => newAccount()}>Sign up</ButtonLogin>
      </Form>
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
