import React from "react";
import { Route } from "react-router-dom";
import WritePortfolioPage from "./pages/WritePortfolioPage";
import AdminPage from "./pages/AdminPage";
import DesignPage from "./pages/DesignPage";
import WriteDesignPage from "./pages/WriteDesignPage";
import PortfoliosPage from "./pages/PortfoliosPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import HeaderContainer from "./containers/common/HeaderContainer";

const App = () => {
  return (
    <>
      <HeaderContainer />
      <Route component={HomePage} path={["/home", "/"]} exact />
      <Route component={PortfoliosPage} path="/portfolios" />
      <Route component={PortfolioPage} path="/portfolio/:id" />
      <Route component={AboutPage} path="/about" />
      <Route component={WritePortfolioPage} path="/writePortfolio" />
      <Route component={DesignPage} path="/design" />
      <Route component={WriteDesignPage} path="/writeDesign" />
      <Route component={AdminPage} path="/admin" />
    </>
  );
};

export default App;
