import React from "react";
import AdminContainer from "../containers/auth/AdminContainer";
import PageTitle from "./../components/common/PageTitle";

const AdminPage = () => {
  return (
    <>
      <PageTitle subTitle="Admin">Admin</PageTitle>
      <AdminContainer />
    </>
  );
};

export default AdminPage;
