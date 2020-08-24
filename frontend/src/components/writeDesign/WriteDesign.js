import React, { useEffect } from "react";
import Responsive from "./../common/Responsive";
import UploadInput from "./../common/UploadInput";
import Button from "./../common/Button";
import Write from "./../common/Write";
import InputLabelBox from "./../common/InputLabelBox";

const WriteDesign = ({
  onChangeField,
  onPublish,
  id,
  category,
  name,
  designImage,
  designImageRef,
  designError,
  user,
}) => {
  const onChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    onChangeField({ key: name, value: value });
  };

  if (!user) {
    return null;
  }

  return (
    <Write>
      <Responsive>
        <div className="title">
          <h2>Write Design</h2>
        </div>
        <div className="inputBox">
          <InputLabelBox
            type="text"
            placeholder="Category"
            value={category}
            id="category"
            onChange={onChange}
          />
          <InputLabelBox
            type="text"
            placeholder="Name"
            value={name}
            id="name"
            onChange={onChange}
          />
          {designError && <p className="warning">내용을 채워주세요</p>}
          <Button onClick={onPublish}>{id ? "수정하기" : "등록하기"}</Button>
        </div>
        <div className="imgInput">
          <h3>Design Image</h3>
          <UploadInput
            inputName="designImage"
            designImage={designImage}
            designImageRef={designImageRef}
          />
        </div>
      </Responsive>
    </Write>
  );
};

export default WriteDesign;
