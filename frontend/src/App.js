import React from "react";
import { Route, Switch } from "react-router-dom";
import WritePortfolioPage from "./pages/WritePortfolioPage";
import AdminPage from "./pages/AdminPage";
import DesignPage from "./pages/DesignPage";
import WriteDesignPage from "./pages/WriteDesignPage";
import PortfoliosPage from "./pages/PortfoliosPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Header from "./components/common/Header";
import { Helmet } from "react-helmet-async";

const App = () => {
  return (
    <>
      <Helmet>
        <title>Aeran Jeon's Portfolio Website</title>
      </Helmet>
      <Header />
      <Switch>
        <Route component={HomePage} path="/" exact />
        <Route component={PortfoliosPage} path="/portfolios" />
        <Route component={PortfolioPage} path="/portfolio/:id" />
        <Route component={AboutPage} path="/about" />
        <Route component={WritePortfolioPage} path="/writePortfolio" />
        <Route component={DesignPage} path="/design" />
        <Route component={WriteDesignPage} path="/writeDesign" />
        <Route component={AdminPage} path="/admin" />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
