import React from "react";
import PageTitle from "./../components/common/PageTitle";
import Footer from "../components/common/Footer";

const AboutPage = () => {
  return (
    <>
      <div className="page">
        <PageTitle subTitle="About me more">About</PageTitle>
      </div>
      <Footer to="/portfolios" next="Portfolios" />
    </>
  );
};

export default AboutPage;
