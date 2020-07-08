import React from "react";

const WritePortfolio = ({
  onChangeField,
  setThumbImageFile,
  setContentImageFile,
  id,
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
  onPublish,
}) => {
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "skill" || name === "animationEvent" || name === "url") {
      const array = value.split(",");
      onChangeField({ key: name, value: array });
      return;
    }
    onChangeField({ key: name, value: value });
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
    // const formData = new FormData();
    // formData.append("file", e.target.files[0]);

    setThumbImageFile(e.target.files[0]);
  };

  const setContentImage = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("file", e.target.files[0]);

    setContentImageFile(e.target.files[0]);
  };

  return (
    <>
      <input
        type="text"
        name="id"
        placeholder="id"
        value={id}
        onChange={onChange}
      />
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
      <input type="file" name="thumbImage" onChange={setThumbImage} />
      <br />
      <input type="file" name="contentImage" onChange={setContentImage} />
      <br />
      <button onClick={onPublish}>보내기</button>
    </>
  );
};

export default WritePortfolio;
