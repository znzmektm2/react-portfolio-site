import React from "react";
import { Route } from "react-router-dom";
import WritePage from "./pages/WritePage";
import LoginPage from "./pages/LoginPage";
import DesignPage from "./pages/DesignPage";
import PortfoliosPage from "./pages/PortfoliosPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div>
      {/* <Route component={HomePage} path={["/home", "/"]} exact /> */}
      <Route component={PortfoliosPage} path={["/portfolios", "/"]} exact />
      <Route component={PortfolioPage} path="/portfolio" />
      <Route component={AboutPage} path="/about" />
      <Route component={WritePage} path="/write" />
      <Route component={DesignPage} path="/design" />
      <Route component={LoginPage} path="/login" />
    </div>
  );
};

export default App;
