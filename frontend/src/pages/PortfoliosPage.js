import React from "react";
import PageTitle from "./../components/common/PageTitle";
import CategoryContainer from "../containers/portfolios/CategoryContainer";
import PortfolioListContainer from "../containers/portfolios/PortfolioListContainer";

const PortfoliosPage = () => {
  return (
    <div className="page">
      <PageTitle subTitle="All about my">Portfolios</PageTitle>
      <CategoryContainer />
      <PortfolioListContainer />
    </div>
  );
};

export default PortfoliosPage;
