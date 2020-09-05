import React from "react";
import Button from "../common/Button";
import styled from "styled-components";
import Responsive from "../common/Responsive";

const AdminBlock = styled.div`
  position: relative;
  padding: 5rem 0;
  text-align: center;
  background: #fff;
  z-index: 1;

  input {
    margin-right: 1rem;
    padding: 0.5rem 1rem;
    font-family: "KoPub Batang", serif;
    border: 1px solid #525252;
    outline: none;
    background: none;
  }
`;

const AdminForm = ({ password, onChange, onSubmit, onLogout, user, error }) => {
  return (
    <AdminBlock>
      <Responsive>
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
      </Responsive>
    </AdminBlock>
  );
};

export default AdminForm;
