import React from "react";
import AdminContainer from "../containers/auth/AdminContainer";
import PageTitle from "./../components/common/PageTitle";

const AdminPage = () => {
  return (
    <>
      <PageTitle>Admin</PageTitle>
      <AdminContainer />;
    </>
  );
};

export default AdminPage;
