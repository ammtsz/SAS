import React, { useState, useEffect } from "react";
import FormInput from "../component.form-input/form-input.login.component";
import { FormTitle, Form, ButtonLogin } from "./form.login.styles";

import ErrorMessage from "../component.error-message/error-message.login.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  actionSetAuthError,
  actionEmailSignUp,
} from "../../../redux/user/user.actions.js";
import { selectAuthError } from "../../../redux/user/user.selectors";

const mapStateToProps = createStructuredSelector({
  error: selectAuthError,
});
const mapDispatchToProps = (dispatch) => ({
  emailSignUp: (data) => dispatch(actionEmailSignUp(data)),
  setError: (data) => dispatch(actionSetAuthError(data)),
});

const SignUp = ({ error, emailSignUp, setError, newAccount }) => {
  const [inputDatas, setInputDatas] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = inputDatas;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputDatas({ ...inputDatas, [name]: value });
    localStorage.removeItem("trivia");
    localStorage.removeItem("triviaTheme");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("passwords don't match");
      return;
    }
    emailSignUp({ email, password, displayName });
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      document.querySelector("#signUp-error").focus();
    }
  }, [error]);


  return (
    <React.Fragment>
      <FormTitle>Sign Up</FormTitle>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <FormInput
          type="text"
          name="displayName"
          id="signup-name"
          placeholder="name"
          label={<i className="fas fa-user"></i>}
          handleChange={(event) => handleChange(event)}
        />
        <FormInput
          type="email"
          name="email"
          id="signup-email"
          placeholder="email"
          label={<i className="fas fa-envelope"></i>}
          handleChange={(event) => handleChange(event)}
        />
        <FormInput
          type="password"
          name="password"
          id="signup-password"
          placeholder="password"
          label={<i className="fas fa-lock"></i>}
          handleChange={(event) => handleChange(event)}
        />
        <FormInput
          type="password"
          name="confirmPassword"
          id="signup-confirm-password"
          placeholder="confirm password"
          label={<i className="fas fa-lock"></i>}
          handleChange={(event) => handleChange(event)}
        />
        <ErrorMessage
          tabIndex="0"
          id="signUp-error"
          error={error}
          message={
            error
              ? error === "passwords don't match"
                ? "passwords don't match"
                : error.code === "auth/email-already-in-use"
                ? "auth/email-already-in-use"
                : "Something went wrong. Please try again later."
              : ""
          }
        />
        <ButtonLogin>Create account</ButtonLogin>
        <ButtonLogin onClick={() => newAccount()}>Log in</ButtonLogin>
      </Form>
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
