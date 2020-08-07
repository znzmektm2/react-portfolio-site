import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const UploadImageBlock = styled.div`
  position: relative;
  margin-top: 2rem;
  padding: 2.5rem 1rem 1rem;
  min-height: 300px;
  border: 1px solid #eee;

  line-height: 0;
  .wrap {
    position: absolute;
    top: 1rem;
    right: 1rem;
    bottom: 1rem;
    left: 1rem;
    line-height: 0;

    .drop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block !important;
    }
  }
  img {
    margin-top: 1rem;
  }
`;

const UploadInput = ({
  inputName,
  thumbImage,
  contentImage,
  thumbImageRef,
  contentImageRef,
}) => {
  const [imageUrl, setImageUrl] = useState();
  const onDrop = useCallback(
    (acceptedFiles, fileRejections, event) => {
      const files = acceptedFiles;
      let imageUrlArr = [];
      const targetThumbImage = event.target.name === "thumbImage";
      const targetContentImage = event.target.name === "contentImage";
      const contentImageArr = [];

      // 썸네일 이미지는 하나만 등록하기
      if (targetThumbImage && files.length > 1) {
        alert("썸네일 이미지는 하나만 등록 가능합니다.");
        event.target.value = "";
        return;
      }

      for (let i = 0; i < files.length; i++) {
        // 이미지 확장자만 가능
        if (!files[i].type.match("image.*")) {
          alert("이미지 확장자만 가능합니다.");
          event.target.value = "";
          return;
        }

        // thumbImage 폼데이터에 추가하기
        if (targetThumbImage) {
          thumbImageRef.current = files[i];
        }

        // contentImage 폼데이터에 추가하기
        if (targetContentImage) {
          contentImageArr.push(files[i]);
          contentImageRef.current = contentImageArr;
        }

        const reader = new FileReader();
        reader.addEventListener(
          "load",
          (e) => {
            imageUrlArr.push(String(reader.result));
          },
          false
        );
        reader.readAsDataURL(files[i]);
      }

      setImageUrl(imageUrlArr);
    },
    [setImageUrl, thumbImageRef, contentImageRef]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <UploadImageBlock>
      <div {...getRootProps()} className="wrap" id={inputName}>
        {isDragActive && <div className="drop" />}
        <input {...getInputProps()} className="input" name={inputName} />
      </div>
      {imageUrl
        ? imageUrl.map((url) => <img key={url} src={url} alt="img" />)
        : contentImage
        ? contentImage.map((contImg) => (
            <img
              key={contImg.url}
              src={`../${contImg.url}`}
              alt={contImg.name}
            />
          ))
        : thumbImage && (
            <img src={`../${thumbImage.url}`} alt={thumbImage.name} />
          )}
    </UploadImageBlock>
  );
};

export default UploadInput;
