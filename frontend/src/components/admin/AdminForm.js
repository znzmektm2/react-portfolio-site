import React from "react";
import Button from "../common/Button";
import PageTitle from "./../common/PageTitle";

const AdminForm = ({ password, onChange, onSubmit, onLogout, user, error }) => {
  return (
    <div className="page">
      <PageTitle subTitle="Admin">Admin</PageTitle>
      {user ? (
        <div>
          <Button onClick={onLogout}>로그아웃</Button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={onChange}
            value={password}
          />
          <br />
          {error && <div>{error}</div>}
          <Button onClick={onSubmit}>로그인</Button>
        </form>
      )}
    </div>
  );
};

export default AdminForm;
