import React from "react";
import FormInput from "../form-input.login/form-input.login.component";
import {
  FormTitle,
  Form,
  ButtonLogin,
} from "./form.login.styles";

const SignIn = () => {
  return (
    <React.Fragment>
      <FormTitle>Login</FormTitle>
      <Form>
        <FormInput
          type="email"
          label={<i className="fas fa-envelope"></i>}
          placeholder="email"
          handleChange={() => console.log("email")}
        />
        <FormInput
          type="password"
          label={<i className="fas fa-lock"></i>}
          placeholder="senha"
          handleChange={() => console.log("password")}
        />
        <ButtonLogin>Entrar</ButtonLogin>
        <ButtonLogin>Criar Conta</ButtonLogin>
      </Form>
    </React.Fragment>
  );
};

export default SignIn;
