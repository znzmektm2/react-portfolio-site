import React from "react";
import AdminContainer from "../containers/auth/AdminContainer";
import Footer from "../components/common/Footer";
import PageTitle from "./../components/common/PageTitle";
import { Helmet } from "react-helmet-async";

const AdminPage = () => {
  return (
    <>
      <Helmet>
        <title>Admin | JAR</title>
      </Helmet>
      <div className="page admin">
        <PageTitle subTitle="Login and Logout" title="ADMIN" />
        <AdminContainer />
      </div>
      <Footer to="/portfolios" next="PORTFOLIOS" />
    </>
  );
};

export default AdminPage;
