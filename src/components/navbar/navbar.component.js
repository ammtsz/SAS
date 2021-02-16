import React from "react";
import {
  NavbarStyled,
  Logo,
  UserBox,
  Name,
  Login,
  SwitchButtonStyled,
} from "./navbar.styles";
import SwitchButton from "../button-switch/button-switch.component";

import { withRouter } from "react-router";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectUserTheme,
  selectUserDatas,
} from "../../redux/user/user.selectors";
import {
  actionSignOut,
  actionSetUserTheme,
  actionUpdateThemeOnDatabase,
} from "../../redux/user/user.actions";
import { actionResetCategories } from "../../redux/categories/categories.actions";
import { actionResetReport } from "../../redux/report/report.actions";
import { actionResetQuiz } from "../../redux/quiz/quiz.actions";


const mapStateToProps = createStructuredSelector({
  user: selectUserDatas,
  userTheme: selectUserTheme,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(actionSignOut()),
  resetQuiz: () => dispatch(actionResetQuiz()),
  resetCategories: () => dispatch(actionResetCategories()),
  resetReport: () => dispatch(actionResetReport()),
  setTheme: (data) => dispatch(actionSetUserTheme(data)),
  updateThemeOnDatabase: (data) => dispatch(actionUpdateThemeOnDatabase(data)),
});

const Navbar = ({
  user,
  userTheme,
  signOut,
  resetQuiz,
  resetCategories,
  resetReport,
  setTheme,
  updateThemeOnDatabase,
  history,
}) => {

  const signOutActions = () => {
    localStorage.removeItem("trivia");
    localStorage.removeItem("triviaTheme");
    resetQuiz();
    resetCategories();
    resetReport();
    signOut();
  };

  const setUserTheme = (event) => {
    const theme = event.target.checked ? "dark" : "light";
    setTheme(theme);
    updateThemeOnDatabase(theme);
  };

  return (
    <NavbarStyled>
      <Logo tabIndex="0">Teste Dev Frontend</Logo>
      <UserBox>
        <Name>{user ? `Hello, ${user.displayName}` : ""}</Name>
        {user ? (
          <Login onClick={() => signOutActions()}>Log out</Login>
        ) : history.location.pathname === "/login" ? (
          <Login onClick={() => history.push("/")}>skip log in</Login>
        ) : (
          <Login onClick={() => history.push("/login")}>Log in</Login>
        )}
        <SwitchButtonStyled>
          <SwitchButton
            id="navbar-toggle-theme"
            onChange={(event) => setUserTheme(event)}
            label={userTheme}
            checked={userTheme === "dark"}
          />
        </SwitchButtonStyled>
      </UserBox>
    </NavbarStyled>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
