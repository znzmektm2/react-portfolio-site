import React from "react";
import AdminContainer from "../containers/auth/AdminContainer";
import PageTitle from "./../components/common/PageTitle";

const AdminPage = () => {
  return (
    <div className="page">
      <PageTitle subTitle="Admin">Admin</PageTitle>
      <AdminContainer />
    </div>
  );
};

export default AdminPage;
