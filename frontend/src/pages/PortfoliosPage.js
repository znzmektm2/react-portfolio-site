import React from "react";
import PageTitle from "./../components/common/PageTitle";
import CategoryContainer from "../containers/portfolios/CategoryContainer";
import PortfolioListContainer from "../containers/portfolios/PortfolioListContainer";

const PortfoliosPage = () => {
  return (
    <>
      <PageTitle subTitle="All about my">Portfolios</PageTitle>
      <CategoryContainer />
      <PortfolioListContainer />
    </>
  );
};

export default PortfoliosPage;
