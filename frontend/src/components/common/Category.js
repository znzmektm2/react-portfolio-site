import React from "react";
import styled from "styled-components";

const CategoryBlock = styled.div`
  margin: -1px;
  border: 1px solid #1b1b1b;
  ul {
    padding: 1rem 0;
    display: flex;
    justify-content: center;
    color: #e0e0dc;

    li {
      position: relative;
      margin: 1rem 2rem;
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 1;
        cursor: pointer;
      }
      label {
        display: inline-block;
        padding: 0.3rem 1rem;
        font-family: "KoPub Batang", serif;
      }
      input:checked + label {
        border-bottom: 1px solid #e0e0dc;
      }
    }
  }
`;

const Category = (props) => {
  return (
    <CategoryBlock className="categoryBlock">{props.children}</CategoryBlock>
  );
};

export default Category;
