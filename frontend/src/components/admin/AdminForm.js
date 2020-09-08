import React from "react";
import "./AdminForm.scss";
import Button from "../common/Button";
const AdminForm = ({ password, onChange, onSubmit, onLogout, user, error }) => {
  return (
    <div className="adminFromBlock">
      <div className="wrap">
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
            {error && <div>{error}</div>}
            <Button onClick={onSubmit}>로그인</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminForm;
