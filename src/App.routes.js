import React from "react";
import { GlobalStyle } from "./components/GlobalStyle";
import Navbar from "./components/navbar/navbar.component";
import Categories from "./pages/categories/categories-page.component";
import Trivia from "./pages/trivia/trivia-page.component";
import Report from "./pages/report/report-page.component";
import Login from "./pages/login/login-page.component";
import { Main } from "./App.styles";

import { Switch, Route, Redirect } from "react-router-dom";

function AppRoutes({ user, quizActive }) {

  return (
    <React.Fragment>
      <GlobalStyle />
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <Main>
          <Switch>
            <Route
              path="/login"
              render={() => (user ? <Redirect to="/" /> : <Login />)}
            />
            <Route exact path="/">
              <Categories />
            </Route>
            <Route
              path="/quiz"
              render = { () => quizActive ? <Trivia /> : <Redirect to="/" />}
            />
            <Route path="/report">
              <Report />
            </Route>
          </Switch>
        </Main>
      </div>
    </React.Fragment>
  );
}

export default AppRoutes;
