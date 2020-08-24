import React, { useEffect } from "react";
import styled from "styled-components";

const WriteBlock = styled.div`
  font-family: "KoPub Batang", serif;
  padding: 4.53rem 0 5rem;
  background: #f5f5f7;
  min-height: 100vh;
  box-sizing: border-box;

  .title {
    margin-bottom: 4rem;
    h2 {
      position: relative;
      padding-bottom: 1rem;
      display: inline-block;
      font-family: "goku", "KoPub Batang";
      font-size: 7rem;
      line-height: 7rem;
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        display: inline-block;
        width: 30%;
        height: 0.3rem;
        background: #373646;
      }
    }
  }

  .inputBox {
    float: left;
    padding-top: 0.5rem;
    padding-right: 2rem;
    width: 25%;
    line-height: 0;

    .selectBox {
      margin: 0 -0.5rem 1.1rem;
      position: relative;
    }
  }
  .imgInput {
    overflow: hidden;
    h3 {
      margin-bottom: 0.8rem;
      font-size: 1.3rem;
      line-height: 1.3rem;
    }
  }
`;

const Write = (props) => {
  useEffect(() => {
    window.scroll(0, 0);
    const input = document.getElementsByTagName("input");
    const inputArr = [...input];
    inputArr.map((i) => {
      return (
        i.type === "text" &&
        i.value !== "" &&
        i.parentNode.classList.add("value")
      );
    });
  }, []);

  return <WriteBlock>{props.children}</WriteBlock>;
};

export default Write;
