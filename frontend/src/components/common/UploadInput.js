import React, { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const UploadImageBlock = styled.div`
  position: relative;
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #eee;
  .wrap {
    min-height: 300px;
    line-height: 0;
  }
  .input {
    display: block !important;
    margin-bottom: 1rem;
  }
  .drop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fafafa;
    z-index: -1;
  }
`;

const UploadInput = ({
  inputName,
  handleFormData,
  thumbImage,
  contentImage,
}) => {
  const [imageUrl, setImageUrl] = useState();
  const thumbImageInput = useRef();

  const onDrop = useCallback(
    (acceptedFiles, fileRejections, event) => {
      const files = acceptedFiles;
      let imageUrlArr = [];
      const thumbInput =
        event.target.name === "thumbImage" || event.target.id === "thumbImage";

      if (thumbInput && files.length > 1) {
        alert("썸네일 이미지는 하나만 등록 가능합니다.");
        thumbImageInput.current.value = "";
        return;
      }

      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.match("image.*")) {
          alert("이미지 확장자만 가능합니다.");
          thumbImageInput.current.value = "";
          return;
        }

        handleFormData(inputName, files[i]);

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
    [setImageUrl]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <UploadImageBlock>
      <div {...getRootProps()} className="wrap" id={inputName}>
        {isDragActive && <div className="drop" />}
        <input
          {...getInputProps()}
          className="input"
          name={inputName}
          ref={thumbImageInput}
        />
        {imageUrl
          ? imageUrl.map((url) => (
              <div key={url}>
                <img src={url} alt="img" />
              </div>
            ))
          : contentImage
          ? contentImage.map((contImg) => (
              <div key={contImg.name}>
                <img src={`../${contImg.url}`} alt={contImg.name} />
              </div>
            ))
          : thumbImage && (
              <div>
                <img src={`../${thumbImage.url}`} alt={thumbImage.name} />
              </div>
            )}
      </div>
    </UploadImageBlock>
  );
};

export default UploadInput;
