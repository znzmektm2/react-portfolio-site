import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const UploadImageBlock = styled.div`
  position: relative;
  margin-bottom: calc(24px + 0.5vw);
  border: 1px solid #e2e2e2;
  line-height: 0;

  .uploadWrap {
    position: relative;
    padding: calc(0.434em + 0.8vw);
    padding-top: calc(2em + 1.8vw);
    min-height: calc(8em + 1.8vw);
    font-size: 16px;
    line-height: 0;

    .drop {
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .input {
      position: absolute;
      top: calc(0.434em + 0.8vw);
      right: calc(0.434em + 0.8vw);
      bottom: calc(0.434em + 0.8vw);
      left: calc(0.434em + 0.8vw);
      width: calc(100% - (0.434em + 0.8vw) * 2);
      display: block !important;
      font-size: calc(11px + 0.1vw);
    }
  }
`;

const UploadInput = ({
  inputName,
  thumbImage,
  thumbImageRef,
  clientImage,
  clientImageRef,
  contentImage,
  contentImageRef,
  designImage,
  designImageRef,
}) => {
  const [imageUrl, setImageUrl] = useState();
  const onDrop = useCallback(
    (acceptedFiles, fileRejections, event) => {
      const files = acceptedFiles;
      let imageUrlArr = [];
      const targetThumbImage = event.target.id === "thumbImage";
      const targetClientImage = event.target.id === "clientImage";
      const targetContentImage = event.target.id === "contentImage";
      const targetDesignImage = event.target.id === "designImage";
      const contentImageArr = [];

      // 썸네일, 로고 이미지는 하나만 등록하기
      if (
        (targetThumbImage || targetClientImage || targetDesignImage) &&
        files.length > 1
      ) {
        alert("이미지는 하나만 등록 가능합니다.");
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

        // clientImage 폼데이터에 추가하기
        if (targetClientImage) {
          clientImageRef.current = files[i];
        }

        // contentImage 폼데이터에 추가하기
        if (targetContentImage) {
          contentImageArr.push(files[i]);
          contentImageRef.current = contentImageArr;
        }

        // designImage 폼데이터에 추가하기
        if (targetDesignImage) {
          designImageRef.current = files[i];
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

      setTimeout(() => {
        setImageUrl(imageUrlArr);
      }, 100);
    },
    [
      setImageUrl,
      thumbImageRef,
      clientImageRef,
      contentImageRef,
      designImageRef,
    ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <UploadImageBlock>
      <div {...getRootProps()} className="uploadWrap" id={inputName}>
        {isDragActive && <div className="drop" />}
        <input {...getInputProps()} className="input" id={inputName} />
        {(typeof imageUrl === "object" &&
          imageUrl.map((url) => <img key={url} src={url} alt="img" />)) ||
          (thumbImage && (
            <img src={`../${thumbImage.url}`} alt={thumbImage.name} />
          )) ||
          (clientImage && (
            <img src={`../${clientImage.url}`} alt={clientImage.name} />
          )) ||
          (contentImage &&
            contentImage.map((contImg) => (
              <img
                key={contImg.url}
                src={`../${contImg.url}`}
                alt={contImg.name}
              />
            ))) ||
          (designImage && (
            <img src={`../${designImage.url}`} alt={designImage.name} />
          ))}
      </div>
    </UploadImageBlock>
  );
};

export default UploadInput;
