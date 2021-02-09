import React from "react";
import { PageLogin, CardForm } from "./login-page.styles";
import SignIn from "./components/form.login/form-signIn.login.component";
import SignUp from "./components/form.login/form-signUp.login.component";

const Login = () => {
  const hasAnAccount = false;
  return (
    <PageLogin>
      <CardForm>{hasAnAccount ? <SignIn /> : <SignUp />}</CardForm>
    </PageLogin>
  );
};

export default Login;
