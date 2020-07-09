import React from "react";
import styled from "styled-components";

const WritePortfolioBlock = styled.div`
  margin: 0 auto;
  width: 1200px;
  .red {
    font-size: 0.9rem;
    color: red;
  }
  .green {
    font-size: 0.9rem;
    color: green;
  }
`;

const WritePortfolio = ({
  onChangeField,
  onCheckId,
  id,
  haveId,
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
  setThumbImageFile,
  setContentImageFile,
  onPublish,
  portfolio,
  portfolioError,
}) => {
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    onChangeField({ key: name, value: value });
    if (name === "id") {
      onCheckId(value);
    }
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

  const setThumbImage = (e) => {
    e.preventDefault();
    setThumbImageFile(e.target.files[0]);
  };

  const setContentImage = (e) => {
    e.preventDefault();
    setContentImageFile(e.target.files[0]);
  };

  return (
    <WritePortfolioBlock>
      <input
        type="text"
        name="id"
        placeholder="id"
        value={id}
        onChange={onChange}
      />
      {haveId !== null &&
        (haveId ? (
          <span className="red">아이디 중복</span>
        ) : (
          <span className="green">아이디 사용가능</span>
        ))}
      <br />
      <input
        type="text"
        name="client"
        placeholder="client"
        value={client}
        onChange={onChange}
      />
      <br />
      <input
        type="text"
        name="host"
        placeholder="host"
        value={hostValue}
        onChange={onChange}
      />
      <br />
      <input
        type="radio"
        id="web"
        name="type"
        defaultChecked={web}
        onChange={onChangeRadiobox}
      />
      <label htmlFor="web">web</label>
      <input
        type="radio"
        id="singlePage"
        name="type"
        defaultChecked={singlePage}
        onChange={onChangeRadiobox}
      />
      <label htmlFor="singlePage">singlePage</label>
      <br />
      <input
        type="checkbox"
        name="pcVer"
        defaultChecked={pcVer}
        onChange={onChangeCheckbox}
      />
      <label htmlFor="pcVer">pcVer</label>
      <input
        type="checkbox"
        name="mobileVer"
        defaultChecked={mobileVer}
        onChange={onChangeCheckbox}
      />
      <label htmlFor="mobileVer">mobileVer</label>
      <br />
      <input
        type="checkbox"
        name="responsiveWeb"
        defaultChecked={responsiveWeb}
        onChange={onChangeCheckbox}
      />
      <label htmlFor="responsiveWeb">responsiveWeb</label>
      <br />
      <input
        type="text"
        name="IEVersion"
        placeholder="IEVersion"
        value={IEVersion}
        onChange={onChange}
      />
      <br />
      <input
        type="text"
        name="skill"
        placeholder="skill"
        value={skill}
        onChange={onChange}
      />
      <br />
      <input
        type="text"
        name="animationEvent"
        placeholder="animationEvent"
        value={animationEvent}
        onChange={onChange}
      />
      <br />
      <input
        type="text"
        name="workYear"
        placeholder="workYear"
        value={workYear}
        onChange={onChange}
      />
      <br />
      <input
        type="text"
        name="workMonth"
        placeholder="workMonth"
        value={workMonth}
        onChange={onChange}
      />
      <br />
      <input
        type="text"
        name="period"
        placeholder="period"
        value={period}
        onChange={onChange}
      />
      <br />
      <input
        type="text"
        name="worker"
        placeholder="worker"
        value={worker}
        onChange={onChange}
      />
      <br />
      <input
        type="text"
        name="url"
        placeholder="url"
        value={url}
        onChange={onChange}
      />
      <br />
      <input type="file" name="ThumbImage" onChange={setThumbImage} />
      <br />
      <input type="file" name="contentImage" onChange={setContentImage} />
      <br />
      {portfolioError && <p className="red">내용을 채워주세요</p>}
      <button onClick={onPublish}>보내기</button>
    </WritePortfolioBlock>
  );
};

export default WritePortfolio;
