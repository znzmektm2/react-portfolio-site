import React from "react";
import HomeContainer from "./../containers/home/HomeContainer";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home | JAR</title>
      </Helmet>
      <HomeContainer />
    </>
  );
};

export default HomePage;
