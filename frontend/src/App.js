import React from "react";
import { Route } from "react-router-dom";
import WritePage from "./pages/WritePage";
import LoginPage from "./pages/LoginPage";
import DesignPage from "./pages/DesignPage";
import PortfoioListPage from "./pages/PortfoioListPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  return (
    <div>
      <Route component={PortfoioListPage} path={["/portfolios", "/"]} exact />
      <Route component={PortfolioPage} path="/portfolio" />
      <Route component={AboutPage} path="/about" />
      <Route component={WritePage} path="/write" />
      <Route component={DesignPage} path="/design" />
      <Route component={LoginPage} path="/login" />
    </div>
  );
};

export default App;
