import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const buttonStyle = css`
  position: relative;
  outline: none;
  padding: 8px 16px;
  font-size: 13px;
  line-height: 1.2em;
  border: 1px solid #525252;
  background: none;
  cursor: pointer;

  & + & {
    margin-left: 1rem;
  }

  @media screen and (max-width: 1024px) {
    padding: 7px 14px;
    font-size: 12px;
    line-height: 1.1em;
  }

  @media screen and (max-width: 640px) {
    padding: 6px 12px;
    font-size: 10px;
    line-height: 1em;
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
      font-size: 16px;
      line-height: normal;
    `}
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? <StyleLink {...props} /> : <StyleButton {...props} />;
};

export default Button;
