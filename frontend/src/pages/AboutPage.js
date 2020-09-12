import React from "react";
import PageTitle from "./../components/common/PageTitle";
import Footer from "../components/common/Footer";
import About from "../components/about/About";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About | JAR</title>
      </Helmet>
      <div className="page">
        <PageTitle subTitle="About me more" title="About" />
        <About />
      </div>
      <Footer to="/portfolios" next="Portfolios" />
    </>
  );
};

export default AboutPage;
