import React from "react";
import styled from "styled-components";

const TitleBlock = styled.div`
  margin: 20rem 0;
  padding: 4rem 0;
  text-align: center;
  h2 {
    font-family: "goku";
    font-size: 7.35em;
    line-height: 1.05em;
    letter-spacing: -0.01em;
  }
`;

const PageTitle = ({ children }) => {
  return (
    <TitleBlock>
      <h2>{children}</h2>
    </TitleBlock>
  );
};

export default PageTitle;
