import React, { useEffect } from "react";
import AppRoutes from "./App.routes";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCredentials } from "./redux/user/user.selectors";
import { actionSetUserAuth } from "./redux/user/user.actions";
import { selectQuizActive } from "./redux/quiz/quiz.selectors";

const mapStateToProps = createStructuredSelector({
  user: selectCredentials,
  quizActive: selectQuizActive,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: () => dispatch(actionSetUserAuth()),
});

const App = (props) => {
  let { setUserAuth } = props;
  useEffect(() => {
    setUserAuth();
    return () => setUserAuth();
  }, [setUserAuth]);

  return <AppRoutes {...props} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
