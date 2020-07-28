import React from "react";
import PageTitle from "./../components/common/PageTitle";
import WritePortfolioContainer from "./../containers/write/WritePortfolioContainer";

const WritePage = () => {
  return (
    <>
      <PageTitle subTitle="Write">Write</PageTitle>
      <WritePortfolioContainer />
    </>
  );
};

export default WritePage;
