import React from "react";
import PageTitle from "./../components/common/PageTitle";
import PortfolioCategoryContainer from "../containers/portfolios/PortfolioCategoryContainer";
import PortfolioListContainer from "../containers/portfolios/PortfolioListContainer";
import Footer from "../components/common/Footer";
import { Helmet } from "react-helmet-async";

const PortfoliosPage = () => {
  return (
    <>
      <Helmet>
        <title>Portfolios | JAR</title>
      </Helmet>
      <div className="page portfolios">
        <PageTitle subTitle="All about my" title="PORTFOLIOS" />
        <PortfolioCategoryContainer />
        <PortfolioListContainer />
      </div>
      <Footer to="/design?category=Photoshop" next="DESIGN" className="portfolios" />
    </>
  );
};

export default PortfoliosPage;
