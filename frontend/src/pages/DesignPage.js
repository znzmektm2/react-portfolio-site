import React from "react";
import PageTitle from "./../components/common/PageTitle";
import Footer from "./../components/common/Footer";

const DesignPage = () => {
  return (
    <>
      <div className="page">
        <PageTitle subTitle="A small selection of my">Design</PageTitle>
      </div>
      <Footer to="/home" next="Home" />
    </>
  );
};

export default DesignPage;
