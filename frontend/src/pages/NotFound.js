import React from "react";
import PageTitle from "./../components/common/PageTitle";
import Footer from "../components/common/Footer";
import { withRouter } from "react-router-dom";

const NotFound = ({ match}) => {
  console.log(match.url);

  if(match.url === "/" ) {
    return null;
  }
  
  return (
    <>
      <div className="page notFound">
        <PageTitle subTitle="Page not found" title="404" />
      </div>
      <Footer to="/portfolios" next="Portfolios" />
    </>
  );
};

export default withRouter(NotFound);
