import React from "react";
import Button from "../common/Button";
import UploadInput from "./../common/UploadInput";
import Write from "./../common/Write";
import InputLabelBox from "./../common/InputLabelBox";

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
  removeclientImage,
  onPublish,
  portfolioError,
  originalPortfolioId,
  user,
}) => {
  // onChange 관리
  const onChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    onChangeField({ key: name, value: value });
    if (name === "id") {
      onCheckId(value);
    }
  };

  // 라디오박스 이벤트
  const onChangeRadiobox = (e) => {
    const radioBoxes = document.getElementsByName("type");
    radioBoxes.forEach((r) => {
      if (r.id !== e.target.id) {
        onChangeField({ key: r.id, value: false });
      }
    });
    onChangeField({ key: e.target.id, value: e.target.checked });
  };

  // 체크박스 이벤트
  const onChangeCheckbox = (e) => {
    onChangeField({ key: e.target.id, value: e.target.checked });
  };

  // 중복 아이디 검사
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

  if (!user) {
    return null;
  }

  return (
    <Write>
      <div className="wrap">
        <div className="title">
          <h2>Write Portfolio</h2>
        </div>
        <div className="inputBox">
          <InputLabelBox
            type="text"
            placeholder="Id"
            value={id}
            id="id"
            onChange={onChange}
            checkDuplicatedId={checkDuplicatedId}
          />
          <InputLabelBox
            type="text"
            placeholder="Client"
            value={client}
            id="client"
            onChange={onChange}
          />
          <InputLabelBox
            type="text"
            placeholder="Host"
            value={host && host}
            id="host"
            onChange={onChange}
          />
          <div className="selectBox">
            <InputLabelBox
              type="radio"
              placeholder="Web"
              defaultChecked={web}
              name="type"
              id="web"
              onChange={onChangeRadiobox}
              className="select"
              label="Web"
            />
            <InputLabelBox
              type="radio"
              placeholder="SinglePage"
              defaultChecked={singlePage}
              name="type"
              id="singlePage"
              onChange={onChangeRadiobox}
              className="select"
              label="SinglePage"
            />
          </div>
          <div className="selectBox">
            <InputLabelBox
              type="checkbox"
              placeholder="PC"
              defaultChecked={pcVer}
              id="pcVer"
              onChange={onChangeCheckbox}
              className="select"
              label="PC"
            />
            <InputLabelBox
              type="checkbox"
              placeholder="Mobile"
              defaultChecked={mobileVer}
              id="mobileVer"
              onChange={onChangeCheckbox}
              className="select"
              label="Mobile"
            />
            <InputLabelBox
              type="checkbox"
              placeholder="Responsive"
              defaultChecked={responsiveWeb}
              id="responsiveWeb"
              onChange={onChangeCheckbox}
              className="select"
              label="Responsive"
            />
          </div>
          <InputLabelBox
            type="text"
            placeholder="IE Version"
            value={IEVersion}
            id="IEVersion"
            onChange={onChange}
          />
          <InputLabelBox
            type="text"
            placeholder="Skill"
            value={skill}
            id="skill"
            onChange={onChange}
          />
          <InputLabelBox
            type="text"
            placeholder="Work Year"
            value={workYear}
            id="workYear"
            onChange={onChange}
          />
          <InputLabelBox
            type="text"
            placeholder="Work Month"
            value={workMonth}
            id="workMonth"
            onChange={onChange}
          />
          <InputLabelBox
            type="text"
            placeholder="Period"
            value={period}
            id="period"
            onChange={onChange}
          />
          <InputLabelBox
            type="text"
            placeholder="Worker"
            value={worker}
            id="worker"
            onChange={onChange}
          />
          <InputLabelBox
            type="text"
            placeholder="URL"
            value={url}
            id="url"
            onChange={onChange}
          />
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
            removeclientImage={removeclientImage}
          />
          <h3>Contents Image</h3>
          <UploadInput
            inputName="contentImage"
            contentImage={contentImage}
            contentImageRef={contentImageRef}
          />
        </div>
      </div>
    </Write>
  );
};

export default WritePortfolio;
