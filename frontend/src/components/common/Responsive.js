import React from "react";
import styled from "styled-components";

const ResposiveBlock = styled.div`
  margin: 0 auto;
  padding: 0 125px;
  max-width: 1780px;
  box-sizing: border-box;
`;

const Responsive = ({ children, ...rest }) => {
  return (
    <ResposiveBlock {...rest} className="resposiveBlock">
      {children}
    </ResposiveBlock>
  );
};

export default Responsive;
