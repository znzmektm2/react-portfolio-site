import React from "react";
import PortfolioContainer from "../containers/portfolio/PortfolioContainer";
import { Helmet } from "react-helmet-async";

const PortfolioPage = () => {
  return (
    <>
      <Helmet>
        <title>Portfolio | JAR</title>
      </Helmet>
      <PortfolioContainer />
    </>
  );
};

export default PortfolioPage;
