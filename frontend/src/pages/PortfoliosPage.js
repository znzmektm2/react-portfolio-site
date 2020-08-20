import React from "react";
import PageTitle from "./../components/common/PageTitle";
import PortfolioCategoryContainer from "../containers/portfolios/PortfolioCategoryContainer";
import PortfolioListContainer from "../containers/portfolios/PortfolioListContainer";
import Footer from "../components/common/Footer";

const PortfoliosPage = () => {
  return (
    <>
      <div className="page">
        <PageTitle subTitle="All about my">Portfolios</PageTitle>
        <PortfolioCategoryContainer />
        <PortfolioListContainer />
      </div>
      <Footer to="/design" next="Design" />
    </>
  );
};

export default PortfoliosPage;
