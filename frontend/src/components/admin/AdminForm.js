import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledButton = styled.button`
  line-height: 1.5rem;
  vertical-align: middle;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: #aaa;
  &:hover {
    background: #ddd;
  }
`;

const StyledLink = styled(Link)`
  line-height: 1.5rem;
  vertical-align: middle;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: #aaa;
  &:hover {
    background: #ddd;
  }
`;

const AdminForm = ({ password, onChange, onSubmit, onLogout, user, error }) => {
  if (error) {
    console.log(error);
  }
  return (
    <div>
      {user ? (
        <div>
          <StyledLink to="/home">홈으로 이동</StyledLink>
          <StyledButton onClick={onLogout}>로그아웃</StyledButton>
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
          <StyledButton onClick={onSubmit}>로그인</StyledButton>
        </form>
      )}
    </div>
  );
};

export default AdminForm;
