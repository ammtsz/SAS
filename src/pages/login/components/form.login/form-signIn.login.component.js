import React, { useState } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  actionSetPersistence,
  actionEmailSignIn,
} from "../../../../redux/user/user.actions";
import {
  selectPersistence,
  selectAuthError,
} from "../../../../redux/user/user.selectors";

import { FormTitle, Form, ButtonLogin } from "./form.login.styles";
import FormInput from "../form-input.login/form-input.login.component";
import ButtonSwitch from "../../../../components/button-switch/button-switch.component";
import ErrorMessage from "../error-message.login/error-message.login.component";

const SignIn = ({
  newAccount,
  persistence,
  error,
  setPersistence,
  emailSignIn,
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


  return (
    <React.Fragment>
      <FormTitle>Login</FormTitle>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          emailSignIn({ email, password });
        }}
      >
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
          placeholder="senha"
          label={<i className="fas fa-lock"></i>}
          handleChange={(event) => handleChange(event)}
        />
        <ErrorMessage
          error={error}
          message={
            error
              ? error.code === "auth/invalid-email" ||
                error.code === "auth/user-not-found"
                ? "email e/ou senha inválidos"
                : "Error ao logar. Tente novamente mais tarde."
              : ""
          }
        />
        <ButtonSwitch
          id="signin-persistence"
          label="salvar usuario"
          checked={persistence}
          onChange={(event) => setPersistence(event.target.checked)}
        />

        <ButtonLogin type="submit">Entrar</ButtonLogin>
        <ButtonLogin onClick={() => newAccount()}>Criar Conta</ButtonLogin>
      </Form>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  persistence: selectPersistence,
  error: selectAuthError,
});
const mapDispatchToProps = (dispatch) => ({
  setPersistence: (data) => dispatch(actionSetPersistence(data)),
  emailSignIn: (data) => dispatch(actionEmailSignIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
