import React from "react";
import FormInput from "../form-input.login/form-input.login.component";
import {
  FormTitle,
  Form,
  ButtonLogin,
} from "./form.login.styles";

const SignUp = () => {
  return (
    <React.Fragment>
      <FormTitle>Sign Up</FormTitle>
      <Form>
      <FormInput
          type="text"
          label={<i className="fas fa-user"></i>}
          placeholder="nome"
          handleChange={() => console.log("nome")}
        />  
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
        <FormInput
        type="password"
        label={<i className="fas fa-lock"></i>}
        placeholder="Confirme a senha"
        handleChange={() => console.log("confirm password")}
      />
        <ButtonLogin>Cadastrar</ButtonLogin>
        <ButtonLogin>Ja tenho uma conta</ButtonLogin>
      </Form>
    </React.Fragment>
  );
};

export default SignUp;
