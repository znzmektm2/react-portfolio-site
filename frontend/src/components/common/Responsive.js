import React from "react";
import styled from "styled-components";

const ResposiveBlock = styled.div`
  margin: 0 auto;
  max-width: 1530px;
`;

const Responsive = ({ children, ...rest }) => {
  return <ResposiveBlock {...rest}>{children}</ResposiveBlock>;
};

export default Responsive;
