import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const buttonStyle = css`
  margin: 0.5rem 0;
  line-height: 1.5rem;
  vertical-align: middle;
  border: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: #aaa;
  &:hover {
    background: #ddd;
  }
  & + & {
    margin-left: 1rem;
  }
`;

const StyleButton = styled.button`
  ${buttonStyle};
`;

const StyleLink = styled(Link)`
  ${(props) =>
    props.to &&
    css`
      margin-right: 1rem;
    `}
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? <StyleLink {...props} /> : <StyleButton {...props} />;
};

export default Button;
