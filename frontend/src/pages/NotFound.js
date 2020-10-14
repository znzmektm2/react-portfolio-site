import React from "react";
import PageTitle from "./../components/common/PageTitle";
import Footer from "../components/common/Footer";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>About | NotFound</title>
      </Helmet>
      <div className="page">
        <PageTitle subTitle="Page not found" title="404" />
      </div>
      <Footer to="/portfolios" next="Portfolios" />
    </>
  );
};

export default NotFound;
