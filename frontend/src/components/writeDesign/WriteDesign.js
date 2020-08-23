import React, { useEffect } from "react";
import Responsive from "./../common/Responsive";
import UploadInput from "./../common/UploadInput";
import Button from "./../common/Button";
import Write from "./../common/Write";

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

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Write onChangeField={onChangeField}>
      <Responsive>
        <div className="title">
          <h2>Write Design</h2>
        </div>
        <div className="inputBox">
          <div className="labelInputBox">
            <input
              type="text"
              placeholder="category"
              name="category"
              value={category}
              id="category"
              onChange={onChange}
              onFocus={onFocus}
            />
            <label htmlFor="category">category</label>
          </div>
          <div className="labelInputBox">
            <input
              type="text"
              placeholder="name"
              name="name"
              value={name}
              id="name"
              onChange={onChange}
              onFocus={onFocus}
            />
            <label htmlFor="name">name</label>
          </div>
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
