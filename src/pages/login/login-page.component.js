import React, { useState } from "react";
import { PageLogin, CardForm } from "./login-page.styles";
import SignIn from "./components/form.login/form-signIn.login.component";
import SignUp from "./components/form.login/form-signUp.login.component";

import { connect } from "react-redux";
import { actionSetAuthError } from "../../redux/user/user.actions";

const Login = ({ setAuthError }) => {
  const [newAccount, setNewAccount] = useState(false);

  const isNewAccount = () => {
    setNewAccount(!newAccount);
    setAuthError(null);
  };

  return (
    <PageLogin>
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

const mapDispatchToProps = (dispatch) => ({
  setAuthError: (error) => dispatch(actionSetAuthError(error)),
});

export default connect(null, mapDispatchToProps)(Login);
