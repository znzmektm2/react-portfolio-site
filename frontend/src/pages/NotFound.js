import React from "react";
import PageTitle from "./../components/common/PageTitle";
import Footer from "../components/common/Footer";

const NotFound = () => {
  return (
    <>
      <div className="page notFound">
        <PageTitle subTitle="Page not found" title="404" />
      </div>
      <Footer to="/portfolios" next="PORTFOLIOS" />
    </>
  );
};

export default NotFound;
