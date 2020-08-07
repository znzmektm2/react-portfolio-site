import React from "react";
import PageTitle from "./../components/common/PageTitle";
import CategoryContainer from "../containers/portfolios/CategoryContainer";
import PortfolioListContainer from "../containers/portfolios/PortfolioListContainer";
import Footer from "../components/common/Footer";

const PortfoliosPage = () => {
  return (
    <>
      <div className="page">
        <PageTitle subTitle="All about my">Portfolios</PageTitle>
        <CategoryContainer />
        <PortfolioListContainer />
      </div>
      <Footer to="/design" next="Design" />
    </>
  );
};

export default PortfoliosPage;
