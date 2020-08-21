import React from "react";
import Footer from "../components/common/Footer";
import HomeContainer from "./../containers/home/HomeContainer";

const HomePage = () => {
  return (
    <>
      <div className="page">
        <HomeContainer />
      </div>
      <Footer to="/about" next="About" />
    </>
  );
};

export default HomePage;
