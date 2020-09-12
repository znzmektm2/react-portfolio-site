import React from "react";
import WritePortfolioContainer from "./../containers/writePortfolio/WritePortfolioContainer";
import { Helmet } from "react-helmet-async";

const WritePortfolioPage = () => {
  return (
    <>
      <Helmet>
        <title>Write Portfolio | JAR</title>
      </Helmet>
      <WritePortfolioContainer />
    </>
  );
};

export default WritePortfolioPage;
