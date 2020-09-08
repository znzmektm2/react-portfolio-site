import React from "react";
import styled from "styled-components";

const TitleBlock = styled.div`
  position: relative;
  height: 100vh;
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -3px;
    width: 6px;
    height: 100%;
    background: linear-gradient(180deg, #ff3000, #ed0200, #ff096c, #d50082);
    transform: skew(-45deg);
  }
  div {
    margin-top: -2rem;
    text-align: center;
    z-index: 1;
    h3 {
      font-family: "trump-gothic-pro";
      font-size: 4.2rem;
      line-height: 5rem;
      font-style: italic;
    }
    h2 {
      font-family: "goku";
      font-size: 11rem;
      line-height: 12rem;
      letter-spacing: -0.01em;
    }
  }
`;

const PageTitle = (props) => {
  return (
    <TitleBlock className="pageTitle">
      <div>
        <h3>{props.subTitle}</h3>
        <h2>{props.title}</h2>
      </div>
    </TitleBlock>
  );
};

export default PageTitle;
