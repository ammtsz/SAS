import React, { useState } from "react";
import { PageLogin, CardForm } from "./login-page.styles";

import SignIn from "./component.form/form-signIn.login.component";
import SignUp from "./component.form/form-signUp.login.component";

import { connect } from "react-redux";
import { actionSetAuthError } from "../../redux/user/user.actions";

const mapDispatchToProps = (dispatch) => ({
  setAuthError: (error) => dispatch(actionSetAuthError(error)),
});

const Login = ({ setAuthError }) => {
  const [newAccount, setNewAccount] = useState(false);

  const isNewAccount = () => {
    setNewAccount(!newAccount);
    setAuthError(null);
  };

  return (
    <PageLogin data-testid="login-page">
      <CardForm>
        {newAccount ? (
          <SignUp newAccount={isNewAccount} />
        ) : (
          <SignIn newAccount={isNewAccount} />
        )}
      </CardForm>
    </PageLogin>
  );
};

export default connect(null, mapDispatchToProps)(Login);
