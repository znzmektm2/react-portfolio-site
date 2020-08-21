import React from "react";
import PageTitle from "./../components/common/PageTitle";
import Footer from "./../components/common/Footer";
import DesignCategoryContainer from "../containers/design/DesignCategoryContainer";
import DesignListContainer from "../containers/design/DesignListContainer";

const DesignPage = () => {
  return (
    <>
      <div className="page design">
        <PageTitle subTitle="A small selection of my" title="Design" />
        <DesignCategoryContainer />
        <DesignListContainer />
      </div>
      <Footer to="/home" next="Home" />
    </>
  );
};

export default DesignPage;
