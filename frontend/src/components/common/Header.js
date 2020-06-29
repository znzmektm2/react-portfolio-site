import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25em 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: #aaa;
  &:hover {
    background: #ddd;
  }
`;

const StyledLink = styled(Link)`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25em 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: #aaa;
  &:hover {
    background: #ddd;
  }
`;

const Header = ({ user, onLogout }) => {
  return (
    <div>
      {user ? (
        <StyledButton onClick={onLogout}>로그아웃</StyledButton>
      ) : (
        <StyledLink to="/login">로그인</StyledLink>
      )}
    </div>
  );
};

export default Header;
