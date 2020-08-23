import React from "react";
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
    .labelInputBox {
      position: relative;
      margin-bottom: 1.2rem;
      display: flex;
      line-height: 0;
      :before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        display: inline-block;
        width: 100%;
        height: 1px;
        background: #e2e2e2;
        z-index: 1;
      }
      :after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        display: inline-block;
        width: 0;
        height: 1px;
        background: linear-gradient(90deg, #ff2f00, #ed1931, #fd0c68, #cb018f);
        z-index: 1;
        transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      }
      input {
        flex-grow: 1;
        position: relative;
        margin-right: 1rem;
        display: inline-block;
        width: 100%;
        font-family: "KoPub Batang", serif;
        font-size: 0.8rem;
        height: 1.7rem;
        outline: none;
        border: none;
        background: #f5f5f7;
        &::placeholder {
          color: transparent;
        }
      }

      label {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        font-size: 0.8rem;
        line-height: 1.7rem;
        color: #b0aeb5;
        transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      }

      &.focus {
        :after {
          content: "";
          width: 100%;
        }

        label {
          top: -1rem;
          font-size: 0.7rem;
          opacity: 0.5;
        }
      }
      &.value {
        label {
          top: -1rem;
          font-size: 0.7rem;
          opacity: 0.5;
        }
      }
    }
    .selectBox {
      margin: 0 -0.5rem 1.1rem;
      position: relative;
      .labelInputBox {
        display: inline-block;
        margin: 0 0.5rem;
        &:before {
          display: none;
        }
        &:after {
          display: none;
        }

        input {
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          cursor: pointer;

          &:checked + label {
            color: #cb018f;
            font-weight: bold;
          }
        }
        label {
          position: relative;
        }
      }
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
  return <WriteBlock>{props.children}</WriteBlock>;
};

export default Write;
