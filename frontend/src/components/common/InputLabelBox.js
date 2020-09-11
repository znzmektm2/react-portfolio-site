import React from "react";
import styled from "styled-components";

const InputLabelBoxBlock = styled.div`
  position: relative;
  margin-bottom: 29px;
  display: flex;
  line-height: 0;
  font-size: 16px;

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
    margin-right: 1em;
    display: inline-block;
    width: 100%;
    font-family: "KoPub Batang", serif;
    font-size: 13px;
    line-height: 28px;
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
    font-size: 13px;
    line-height: 28px;
    color: #b0aeb5;
    transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &.focus {
    :after {
      content: "";
      width: 100%;
    }

    label {
      top: -20px;
      font-size: 11px;
      opacity: 0.5;
    }
  }

  &.value {
    label {
      top: -20px;
      font-size: 11px;
      opacity: 0.5;
    }
  }

  &.select {
    display: inline-block;
    margin: 0 12px;

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
    }

    input:checked + label {
      color: #cb018f;
      font-weight: bold;
    }

    label {
      position: relative;
    }
  }
`;

const InputLabelBox = ({
  type,
  placeholder,
  value,
  name,
  id,
  defaultChecked,
  onChange,
  checkDuplicatedId,
  className,
  label,
}) => {
  const onFocus = (e) => {
    const target = e.target;
    target.addEventListener("focus", (e) => {
      target.parentNode.classList.add("focus");
    });

    target.addEventListener("focusout", (e) => {
      target.parentNode.classList.remove("focus");
      if (target.value) {
        target.parentNode.classList.add("value");
        return;
      }
      target.parentNode.classList.remove("value");
    });
  };

  return placeholder ? (
    <InputLabelBoxBlock>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        id={id}
        onChange={onChange}
        onFocus={onFocus}
      />
      <label htmlFor={id}>{placeholder}</label>
      {checkDuplicatedId && checkDuplicatedId()}
    </InputLabelBoxBlock>
  ) : (
    <InputLabelBoxBlock className={className}>
      <input
        type={type}
        defaultChecked={defaultChecked}
        name={name && name}
        id={id}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </InputLabelBoxBlock>
  );
};

export default InputLabelBox;
