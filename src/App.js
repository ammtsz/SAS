import React, { useEffect } from "react";
import AppRoutes from "./App.routes";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserDatas } from "./redux/user/user.selectors";
import {
  actionSetUserAuth,
  actionGetUserTheme,
} from "./redux/user/user.actions";
import {
  selectQuizActive,
  selectQuizCategory,
} from "./redux/quiz/quiz.selectors";
import { selectReportCategory } from "./redux/report/report.selectors";
import { selectUserTheme } from "./redux/user/user.selectors";

const mapStateToProps = createStructuredSelector({
  user: selectUserDatas,
  quizActive: selectQuizActive,
  reportCategory: selectReportCategory,
  quizCategory: selectQuizCategory,
  userTheme: selectUserTheme,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: () => dispatch(actionSetUserAuth()),
  getUserTheme: () => dispatch(actionGetUserTheme()),
});

const App = (props) => {
  let { setUserAuth, getUserTheme } = props;

  useEffect(() => {
    setUserAuth();
    getUserTheme();
    return () => {
      setUserAuth();
      getUserTheme();
    };
  }, [setUserAuth, getUserTheme]);

  return <AppRoutes {...props} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
