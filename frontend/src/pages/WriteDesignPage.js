import React from "react";
import WriteDesignContainer from "./../containers/writeDesign/WriteDesignContainer";
import { Helmet } from "react-helmet-async";

const WriteDesignPage = () => {
  return (
    <>
      <Helmet>
        <title>Write Design | JAR</title>
      </Helmet>
      <WriteDesignContainer />
    </>
  );
};

export default WriteDesignPage;
