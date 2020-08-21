import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Responsive from "./../common/Responsive";
import UploadInput from "./../common/UploadInput";

const WritePortfolioBlock = styled.div`
  font-family: "KoPub Batang", serif;
  padding: 4.53rem 0 5rem;
  background: #f5f5f7;

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

const WritePortfolio = ({
  onChangeField,
  onCheckId,
  id,
  hasId,
  client,
  hostValue,
  web,
  singlePage,
  pcVer,
  mobileVer,
  responsiveWeb,
  IEVersion,
  skill,
  animationEvent,
  workYear,
  workMonth,
  period,
  worker,
  url,
  thumbImage,
  contentImage,
  thumbImageRef,
  contentImageRef,
  onPublish,
  portfolioError,
  originalPortfolioId,
  user,
}) => {
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    onChangeField({ key: name, value: value });
    if (name === "id") {
      onCheckId(value);
    }
  };
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

  const onChangeRadiobox = (e) => {
    const radioBoxes = document.getElementsByName("type");
    radioBoxes.forEach((r) => {
      if (r.id !== e.target.id) {
        onChangeField({ key: r.id, value: false });
      }
    });
    onChangeField({ key: e.target.id, value: e.target.checked });
  };

  const onChangeCheckbox = (e) => {
    onChangeField({ key: e.target.name, value: e.target.checked });
  };

  const checkDuplicatedId = () => {
    if (id === "") {
      return;
    }
    if (id === originalPortfolioId) {
      return <span className="idCheck possible">현재 아이디</span>;
    }
    if (hasId) {
      return <span className="idCheck warning">아이디 중복</span>;
    }
    return <span className="idCheck possible">아이디 사용가능</span>;
  };

  useEffect(() => {
    window.scroll(0, 0);
    const input = document.getElementsByTagName("input");
    const inputArr = [...input];
    inputArr.map((i) => {
      return (
        i.type === "text" &&
        i.value !== " " &&
        i.parentNode.classList.add("value")
      );
    });
  }, []);

  if (!user) {
    return null;
  }

  return (
    <WritePortfolioBlock>
      <Responsive>
        <div className="title">
          <h2>Write Portfolio</h2>
        </div>
        <div className="inputBox">
          <div className="labelInputBox">
            <input
              type="text"
              placeholder="id"
              name="id"
              value={id}
              id="id"
              onChange={onChange}
              onFocus={onFocus}
            />
            <label htmlFor="id">id</label>
            {checkDuplicatedId()}
          </div>
          <div className="labelInputBox">
            <input
              type="text"
              placeholder="client"
              name="client"
              value={client}
              id="client"
              onChange={onChange}
              onFocus={onFocus}
            />
            <label htmlFor="client">client</label>
          </div>
          <div className="labelInputBox">
            <input
              type="text"
              placeholder="host"
              name="host"
              value={hostValue}
              id="host"
              onChange={onChange}
              onFocus={onFocus}
            />
            <label htmlFor="">host</label>
          </div>
          <div className="selectBox">
            <div className="labelInputBox">
              <input
                type="radio"
                id="web"
                placeholder="type"
                name="type"
                defaultChecked={web}
                onChange={onChangeRadiobox}
              />
              <label htmlFor="web">Web</label>
            </div>
            <div className="labelInputBox">
              <input
                type="radio"
                id="singlePage"
                placeholder="type"
                name="type"
                defaultChecked={singlePage}
                onChange={onChangeRadiobox}
              />
              <label htmlFor="singlePage">Singlepage</label>
            </div>
          </div>
          <div className="selectBox">
            <div className="labelInputBox">
              <input
                type="checkbox"
                placeholder="pcVer"
                name="pcVer"
                defaultChecked={pcVer}
                onChange={onChangeCheckbox}
              />
              <label htmlFor="pcVer">PC</label>
            </div>
            <div className="labelInputBox">
              <input
                type="checkbox"
                placeholder="mobileVer"
                name="mobileVer"
                defaultChecked={mobileVer}
                onChange={onChangeCheckbox}
              />
              <label htmlFor="mobileVer">Mobile</label>
            </div>
            <div className="labelInputBox">
              <input
                type="checkbox"
                placeholder="responsiveWeb"
                name="responsiveWeb"
                defaultChecked={responsiveWeb}
                onChange={onChangeCheckbox}
              />
              <label htmlFor="responsiveWeb">Responsive</label>
            </div>
          </div>
          <div className="labelInputBox">
            <input
              type="text"
              placeholder="IEVersion"
              name="IEVersion"
              value={IEVersion}
              id="IEVersion"
              onChange={onChange}
              onFocus={onFocus}
            />
            <label htmlFor="IEVersion">IEVersion</label>
          </div>
          <div className="labelInputBox">
            <input
              type="text"
              placeholder="skill"
              name="skill"
              value={skill}
              id="skill"
              onChange={onChange}
              onFocus={onFocus}
            />
            <label htmlFor="skill">skill</label>
          </div>
          <div className="labelInputBox">
            <input
              type="text"
              placeholder="animationEvent"
              name="animationEvent"
              value={animationEvent}
              id="animationEvent"
              onChange={onChange}
              onFocus={onFocus}
            />
            <label htmlFor="animationEvent">animationEvent</label>
          </div>
          <div className="labelInputBox">
            <input
              type="text"
              placeholder="workYear"
              name="workYear"
              value={workYear}
              id="workYear"
              onChange={onChange}
              onFocus={onFocus}
            />
            <label htmlFor="workYear">workYear</label>
          </div>
          <div className="labelInputBox">
            <input
              type="text"
              placeholder="workMonth"
              name="workMonth"
              value={workMonth}
              id="workMonth"
              onChange={onChange}
              onFocus={onFocus}
            />
            <label htmlFor="workMonth">workMonth</label>
          </div>
          <div className="labelInputBox">
            <input
              type="text"
              placeholder="period"
              name="period"
              value={period}
              id="period"
              onChange={onChange}
              onFocus={onFocus}
            />
            <label htmlFor="period">period</label>
          </div>
          <div className="labelInputBox">
            <input
              type="text"
              placeholder="worker"
              name="worker"
              value={worker}
              id="worker"
              onChange={onChange}
              onFocus={onFocus}
            />
            <label htmlFor="worker">worker</label>
          </div>
          <div className="labelInputBox">
            <input
              type="text"
              placeholder="url"
              name="url"
              value={url}
              id="url"
              onChange={onChange}
              onFocus={onFocus}
            />
            <label htmlFor="url">url</label>
          </div>
          {portfolioError && <p className="warning">내용을 채워주세요</p>}
          <Button onClick={onPublish}>
            {originalPortfolioId ? "수정하기" : "등록하기"}
          </Button>
        </div>
        <div className="imgInput">
          <h3>Thumbnail Image</h3>
          <UploadInput
            inputName="thumbImage"
            thumbImage={thumbImage}
            thumbImageRef={thumbImageRef}
          />
          <h3>Contents Image</h3>
          <UploadInput
            inputName="contentImage"
            contentImage={contentImage}
            contentImageRef={contentImageRef}
          />
        </div>
      </Responsive>
    </WritePortfolioBlock>
  );
};

export default WritePortfolio;
