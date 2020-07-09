import React from "react";
import { Route } from "react-router-dom";
import WritePage from "./pages/WritePage";
import AdminPage from "./pages/AdminPage";
import DesignPage from "./pages/DesignPage";
import PortfoliosPage from "./pages/PortfoliosPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import Menu from "./containers/common/Menu";

const App = () => {
  return (
    <div>
      <Menu />
      <Route component={HomePage} path={["/home", "/"]} exact />
      <Route component={PortfoliosPage} path="/portfolios" />
      <Route component={PortfolioPage} path="/portfolio/:id" />
      <Route component={AboutPage} path="/about" />
      <Route component={WritePage} path="/write" />
      <Route component={DesignPage} path="/design" />
      <Route component={AdminPage} path="/admin" />
    </div>
  );
};

export default App;
