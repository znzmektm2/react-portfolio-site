import React from "react";
import PageTitle from "./../components/common/PageTitle";
import Footer from "../components/common/Footer";
import About from "../components/about/About";

const AboutPage = () => {
  return (
    <>
      <div className="page">
        <PageTitle subTitle="About me more" title="About" />
        <About />
      </div>
      <Footer to="/portfolios" next="Portfolios" />
    </>
  );
};

export default AboutPage;
