import React, {useEffect} from "react";
import AppRoutes from "./App.routes";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCredentials } from "./redux/user/user.selectors";
import { actionSetUserAuth } from "./redux/user/user.actions";


const App = ({setUserAuth, user}) => {
  useEffect(() => {
    setUserAuth()
    return () => setUserAuth();
  }, [setUserAuth]);

  return <AppRoutes user={user}/>;
}


const mapStateToProps = createStructuredSelector({
  user: selectCredentials,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: () => dispatch(actionSetUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
