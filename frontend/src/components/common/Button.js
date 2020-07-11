import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const buttonStyle = css`
  &:first-child {
    margin-left: 0;
  }
  margin: 0.5rem;
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

const StyleButton = styled.button`
  ${buttonStyle}
`;

const StyleLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? <StyleLink {...props} /> : <StyleButton {...props} />;
};

export default Button;
