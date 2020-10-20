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
    padding: calc(13px + 0.1vw) 0;
    text-align: center;

    li {
      position: relative;
      padding: 1rem 2rem;
      display: inline-block;
    }

    li > div {
      position: relative;
    }
  }

  .wrap.type ul li {
    padding:0.5rem 2rem;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 2;
    cursor: pointer;
  }

  label {
    position: relative;
    padding: 0 0.1em;
    display: inline-block;
    font-family: "KoPub Batang", serif;
    font-size: 16px;
    line-height: 1.8em;
    color: ${(props) => (props.portfolioCategory ? "#a3adb9" : "#979797")};
    z-index: 1;
    transition: all 0.3s cubic-bezier(0.175, 0.825, 0.27, 1);

    &:before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 1px;
      background: ${(props) =>
        props.portfolioCategory
          ? "linear-gradient(-90deg, #ff2f00, #ed1931, #fd0c68, #cb018f)"
          : "#e0e0e0"};
      opacity: 0.8;
      transition: all 0.3s cubic-bezier(0.175, 0.825, 0.27, 1);
    }
  }

  input:checked + label {
    color: ${(props) => (props.portfolioCategory ? "#222" : "#e0e0e0")};

    &:before {
      content: "";
      width: 100%;
      opacity: 1;
    }
  }

  /* 미디어쿼리 */
  @media screen and (max-width: 1024px) {
    ul li {
      padding: 0.7rem 1.5rem;
    }

    .wrap.type ul li {
      padding:0.3rem 1.5rem;
    }

    label {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 640px) {
    
    ul {
      padding: 1.8rem 1.5rem;
    }

    ul li {
      padding: 0.9rem 1.5rem;
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
