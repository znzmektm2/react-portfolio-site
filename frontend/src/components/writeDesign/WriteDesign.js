import React, { useEffect } from "react";
import styled from "styled-components";
import Responsive from "./../common/Responsive";
import UploadInput from "./../common/UploadInput";
import Button from "./../common/Button";

const WriteDesignBlock = styled.div`
  margin: 5rem auto;
  width: 1200px;
  .red {
    font-size: 0.9rem;
    color: red;
  }
`;

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
    const name = e.target.name;
    const value = e.target.value;
    onChangeField({ key: name, value: value });
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <WriteDesignBlock>
      <Responsive>
        <input
          type="text"
          name="category"
          placeholder="category"
          value={category}
          onChange={onChange}
        />
        <br />
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={onChange}
        />
        <br />
        {designError && <p className="red">내용을 채워주세요</p>}
        <Button onClick={onPublish}>{id ? "수정하기" : "등록하기"}</Button>
        <UploadInput
          inputName="designImage"
          designImage={designImage}
          designImageRef={designImageRef}
        />
      </Responsive>
    </WriteDesignBlock>
  );
};

export default WriteDesign;
