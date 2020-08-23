import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const buttonStyle = css`
  outline: none;
  background: none;
  padding: 0.5rem 1rem;
  border: 1px solid #525252;
  font-size: 0.83rem;
  line-height: 0.95rem;
  cursor: pointer;

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
      font-size: 0.83rem;
      line-height: normal;
    `}
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? <StyleLink {...props} /> : <StyleButton {...props} />;
};

export default Button;
