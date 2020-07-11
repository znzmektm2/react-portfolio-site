import React from "react";
import Button from "../common/Button";

const AdminForm = ({ password, onChange, onSubmit, onLogout, user, error }) => {
  return (
    <div>
      {user ? (
        <div>
          <Button to="/home">홈으로 이동</Button>
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
