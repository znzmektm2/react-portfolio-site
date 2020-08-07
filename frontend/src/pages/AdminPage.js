import React from "react";
import AdminContainer from "../containers/auth/AdminContainer";
import Footer from "../components/common/Footer";

const AdminPage = () => {
  return (
    <>
      <AdminContainer />
      <Footer to="/portfolios" next="Portfolios" />
    </>
  );
};

export default AdminPage;
