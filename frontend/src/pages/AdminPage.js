import React from "react";
import AdminContainer from "../containers/auth/AdminContainer";
import Footer from "../components/common/Footer";
import PageTitle from "./../components/common/PageTitle";

const AdminPage = () => {
  return (
    <>
      <div className="page">
        <PageTitle subTitle="Login and Logout" title="Admin" />
        <AdminContainer />
      </div>
      <Footer to="/portfolios" next="Portfolios" />
    </>
  );
};

export default AdminPage;
