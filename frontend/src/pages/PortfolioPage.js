import React from "react";
import PageTitle from "./../components/common/PageTitle";
import PortfolioContainer from "../containers/portfolio/PortfolioContainer";

const PortfolioPage = () => {
  return (
    <>
      <PageTitle subTitle="All about my">Portfolio</PageTitle>
      <PortfolioContainer />
    </>
  );
};

export default PortfolioPage;
