import React from "react";
import styled from "styled-components";

const CategoryBlock = styled.div`
  border-top: ${(props) =>
    props.portfolioCategory ? "1px solid #e4e4e4" : "1px solid #1b1b1b"};
  border-bottom: ${(props) =>
    props.portfolioCategory ? "1px solid #e4e4e4" : "1px solid #1b1b1b"};
  & ~ & {
    border-top: none;
  }
  ul {
    padding: 1rem 0;
    display: flex;
    justify-content: center;
    color: ${(props) => (props.portfolioCategory ? "#222" : "#e0e0dc")};

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
        position: relative;
        display: inline-block;
        padding: 0.3rem 1rem;
        font-family: "KoPub Batang", serif;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background: ${(props) =>
            props.portfolioCategory ? "#222" : "#e0e0dc"};
          opacity: 0.8;
          transition: all 0.5s cubic-bezier(0.175, 0.825, 0.27, 1);
        }
      }
      input:checked + label:before {
        content: "";
        width: 100%;
        opacity: 1;
      }
      &:hover {
        label {
          opacity: 0.8;
          &:before {
            content: "";
            width: 100%;
          }
        }
      }
    }
  }
`;

const Category = (props) => {
  return (
    <CategoryBlock className="categoryBlock" {...props}>
      {props.children}
    </CategoryBlock>
  );
};

export default Category;
