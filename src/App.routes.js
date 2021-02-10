import React from "react";
import { GlobalStyle } from "./components/GlobalStyle";
import Navbar from "./components/navbar/navbar.component";
import Categories from "./pages/categories/categories-page.component";
import Trivia from "./pages/trivia/trivia-page.component";
import Report from "./pages/report/report-page.component";
import Modal from "./components/modal/modal.component";
import Login from "./pages/login/login-page.component";
import { Main } from "./App.styles";

import { Switch, Route, Redirect } from "react-router-dom";

function AppRoutes({user}) {
  const categories = [
    { id: 1, category: "History" },
    { id: 2, category: "Geography" },
    { id: 3, category: "Mithology" },
    { id: 4, category: "Sports" },
    { id: 5, category: "Politics" },
    { id: 6, category: "General Knowledge" },
  ];

  return (
    <React.Fragment>
      <GlobalStyle />
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <Main>
          <Switch>
            <Route path="/login" render={() => user ? <Redirect to="/" /> : <Login />} />
            <Route exact path="/">
              <Categories categories={categories} />
            </Route>
            <Route path="/quiz">
              <Trivia />
            </Route>
            <Route path="/report">
              <Report />
            </Route>
          </Switch>
          {
            // <Modal right={false} />
          }
        </Main>
      </div>
    </React.Fragment>
  );
}

export default AppRoutes;
