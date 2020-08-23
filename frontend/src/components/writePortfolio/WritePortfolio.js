import React, { useEffect } from "react";
import Button from "../common/Button";
import Responsive from "./../common/Responsive";
import UploadInput from "./../common/UploadInput";
import Write from "./../common/Write";

const WritePortfolio = ({
  onChangeField,
  onCheckId,
  id,
  hasId,
  client,
  host,
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
  clientImage,
  contentImage,
  thumbImageRef,
  clientImageRef,
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
        i.value !== "" &&
        i.parentNode.classList.add("value")
      );
    });
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Write>
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
              value={host && host}
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
          <h3>Client Image</h3>
          <UploadInput
            inputName="clientImage"
            clientImage={clientImage}
            clientImageRef={clientImageRef}
          />
          <h3>Contents Image</h3>
          <UploadInput
            inputName="contentImage"
            contentImage={contentImage}
            contentImageRef={contentImageRef}
          />
        </div>
      </Responsive>
    </Write>
  );
};

export default WritePortfolio;
