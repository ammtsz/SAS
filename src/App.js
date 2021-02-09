import React from "react";
import { GlobalStyle } from "./components/GlobalStyle";
import Navbar from "./components/navbar/navbar.component";
import CategoriesPage from "./pages/categories/categories-page.component";
import Trivia from "./pages/trivia/trivia-page.component";
import Report from "./pages/report/report-page.component";
import Modal from "./components/modal/modal.component";
import Login from "./pages/login/login-page.component";
import { Main } from "./App.styles";

function App() {
  const user = "Peter";
  const categories = [
    { id: 1, category: "History" },
    { id: 2, category: "Geography" },
    { id: 3, category: "Mithology" },
    { id: 4, category: "Sports" },
    { id: 5, category: "Politics" },
    { id: 6, category: "General Knowledge" },
  ];

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <header className="App-header">
          <Navbar user={user} />
        </header>
        <Main>
          {
            <React.Fragment>
              <Login />
              <CategoriesPage categories={categories} />
              <Trivia />
              <Report />
              <Modal right={false} />
            </React.Fragment>
          }
        </Main>
      </div>
    </>
  );
}

export default App;
