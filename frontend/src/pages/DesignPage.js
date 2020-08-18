import React from "react";
import PageTitle from "./../components/common/PageTitle";
import Footer from "./../components/common/Footer";
import DesignContainer from "../containers/design/DesignContainer";

const DesignPage = () => {
  return (
    <>
      <div className="page design">
        <PageTitle subTitle="A small selection of my">Design</PageTitle>
        <DesignContainer />
      </div>
      <Footer to="/home" next="Home" />
    </>
  );
};

export default DesignPage;
