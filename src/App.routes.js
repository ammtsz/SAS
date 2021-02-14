import React, { lazy, Suspense } from "react";
import { GlobalStyle } from "./assets/css/GlobalStyle";
import Navbar from "./components/navbar/navbar.component";
// import Categories from "./pages/categories/categories-page.component";
// import Trivia from "./pages/trivia/trivia-page.component";
// import Report from "./pages/report/report-page.component";
// import Login from "./pages/login/login-page.component";
import { Main } from "./App.styles";
import { ThemeProvider } from "styled-components";
import { LightTheme, DarkTheme } from "./assets/css/themes";
import { Switch, Route, Redirect } from "react-router-dom";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/ErrorBoundary/error-boundary.component";

const Categories = lazy(() =>
  import("./pages/categories/categories-page.component")
);
const Trivia = lazy(() => import("./pages/trivia/trivia-page.component"));
const Report = lazy(() => import("./pages/report/report-page.component"));
const Login = lazy(() => import("./pages/login/login-page.component"));

function AppRoutes({
  user,
  quizActive,
  reportCategory,
  quizCategory,
  userTheme,
}) {
  return (
    <ThemeProvider theme={userTheme === "light" ? LightTheme : DarkTheme}>
      <GlobalStyle />
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <Main>
          <Switch>
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <Route
                  path="/login"
                  render={() => (user ? <Redirect to="/" /> : <Login />)}
                />
                <Route exact path="/">
                  <Categories />
                </Route>
                <Route
                  path="/quiz"
                  render={() => (quizActive ? <Trivia /> : <Redirect to="/" />)}
                />
                <Route
                  path="/report"
                  render={() =>
                    reportCategory || quizCategory ? (
                      <Report />
                    ) : (
                      <Redirect to="/" />
                    )
                  }
                />
                <Route path="*" render={() => <Redirect to="/" />} />
              </Suspense>
            </ErrorBoundary>
          </Switch>
        </Main>
      </div>
    </ThemeProvider>
  );
}

export default AppRoutes;
