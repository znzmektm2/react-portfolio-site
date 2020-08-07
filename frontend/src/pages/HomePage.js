import React from "react";
import PageTitle from "./../components/common/PageTitle";
import Footer from "../components/common/Footer";

const HomePage = () => {
  return (
    <>
      <div className="page">
        <PageTitle>Home</PageTitle>
      </div>
      <Footer to="/about" next="About" />
    </>
  );
};

export default HomePage;
